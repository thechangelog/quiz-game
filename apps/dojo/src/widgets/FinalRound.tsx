import { create, tsx } from '@dojo/framework/core/vdom';
import { Round } from '../interfaces';
import Question from './Question';
import * as css from './styles/FinalRound.m.css';
import store from '../middleware/store';
import { setCurrentQuestion } from '../processes/game';

export interface FinalRoundProperties {
	round: Round;
}

const factory = create({ store }).properties<FinalRoundProperties>();

export const FinalRound = factory(function FinalRound({ middleware: { store }, properties }) {
	const { round } = properties();
	const { get, path, executor } = store;
	const [
		{
			name: category,
			questions: [question]
		}
	] = round.categories;
	const currentQuestion = get(path('currentQuestion', 'question'));
	const currentCategory = get(path('currentQuestion', 'category')) || '';
	return (
		<div classes={css.root}>
			{currentQuestion ? (
				<Question
					final
					question={question}
					category={currentCategory}
					onClick={() => {
						executor(setCurrentQuestion)({
							question: undefined,
							category: undefined
						});
					}}
				/>
			) : (
				<div
					classes={css.category}
					onclick={() => {
						executor(setCurrentQuestion)({
							question,
							category
						});
					}}
				>
					Final round category: {category}
				</div>
			)}
		</div>
	);
});

export default FinalRound;
