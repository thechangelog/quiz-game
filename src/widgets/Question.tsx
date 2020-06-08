import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import * as css from './styles/Question.m.css';
import { Question as QuestionData } from '../interfaces';

export interface QuestionProperties {
	question: QuestionData;
	category: string;
	onClick?: (question?: QuestionData) => void;
	onShowAnswer?: () => void;
	final?: boolean;
}

const factory = create({ icache }).properties<QuestionProperties>();

export const Question = factory(function Question({ middleware: { icache }, properties }) {
	const {
		category,
		question: { clue, answer, image, value },
		onClick,
		onShowAnswer,
		final
	} = properties();
	const showAnswer = icache.getOrSet('showAnswer', false);
	return (
		<div classes={[css.root, final && css.finalQuestion]} onclick={() => onClick && onClick()}>
			<div classes={css.questionInfo}>
				<div classes={css.category}>Category: {category}</div>
				{value && <div classes={css.value}>Value: {`${value}`}</div>}
			</div>
			{image && (
				<div classes={css.imageWrapper}>
					<img classes={css.image} src={image} />
				</div>
			)}
			<div classes={css.clue}>{clue}</div>
			{showAnswer ? (
				<div classes={css.answer}>{answer}</div>
			) : (
				<div
					onclick={(event: MouseEvent) => {
						event.stopPropagation();
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
