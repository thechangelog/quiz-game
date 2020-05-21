import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import * as css from './styles/Question.m.css';
import { Question as QuestionData } from '../interfaces';

export interface QuestionProperties {
	question: QuestionData;
	onClick?: (question?: QuestionData) => void;
	onShowAnswer?: () => void;
	final?: boolean;
}

const factory = create({ icache }).properties<QuestionProperties>();

export const Question = factory(function Question({ middleware: { icache }, properties }) {
	const {
		question: { clue, answer },
		onClick,
		onShowAnswer,
		final
	} = properties();
	const showAnswer = icache.getOrSet('showAnswer', false);
	return (
		<div classes={[css.root, final && css.finalQuestion]}>
			<div classes={css.clue} onclick={() => onClick && onClick()}>
				{clue}
			</div>
			{showAnswer ? (
				<div classes={css.answer}>{answer}</div>
			) : (
				<div
					onclick={() => {
						icache.set('showAnswer', true);
						onShowAnswer && onShowAnswer();
					}}
					classes={css.showAnswer}
				>
					Show Answer
				</div>
			)}
		</div>
	);
});

export default Question;
