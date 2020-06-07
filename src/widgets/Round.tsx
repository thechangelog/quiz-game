import { create, tsx } from '@dojo/framework/core/vdom';
import * as css from './styles/Round.m.css';
import Category from './Category';
import Question from './Question';
import { Round as RoundData } from '../interfaces';
import store from '../middleware/store';
import { setCurrentQuestion, markQuestionUsed } from '../processes/game';

export interface RoundProperties {
	round: RoundData;
}

const factory = create({ store }).properties<RoundProperties>();

export const Round = factory(function Round({ middleware: { store }, properties }) {
	const { round } = properties();
	const { get, path, executor } = store;
	const { categories } = round;
	const { question: currentQuestion, category: currentCategory } = get(
		path('currentQuestion')
	) || { question: undefined, category: undefined };
	return (
		<div key="grid" classes={css.root}>
			{categories.map(({ name, questions }) => (
				<Category key={name} name={name} questions={questions} />
			))}

			{currentQuestion ? (
				<Question
					question={currentQuestion}
					category={currentCategory}
					onClick={() => {
						executor(setCurrentQuestion)({
							question: undefined,
							category: undefined
						});
					}}
					onShowAnswer={() => {
						executor(markQuestionUsed)({
							question: currentQuestion,
							category: currentCategory
						});
					}}
				/>
			) : (
				''
			)}
		</div>
	);
});

export default Round;
