import { create, tsx } from '@dojo/framework/core/vdom';
import { Question as QuestionData } from '../interfaces';
import * as css from './styles/Question.m.css';
import icache from '@dojo/framework/core/middleware/icache';

export interface AnswerProperties extends QuestionData {
	used?: boolean;
}

const factory = create({ icache }).properties<AnswerProperties>();

export const Answer = factory(function Answer({ middleware: { icache }, properties }) {
	const open = icache.getOrSet('open', false);
	const { value, clue, answer } = properties();
	const used = icache.getOrSet('used', false);
	const showAnswer = icache.getOrSet('showAnswer', false);
	return (
		<virtual>
			<div classes={css.root} onclick={() => icache.set('open', !used)}>
				<div classes={[css.text, used ? css.used : null]}>{'' + value}</div>
			</div>
			{open && (
				<body>
					<div
						classes={css.underlay}
						onclick={(event) => {
							event.stopPropagation();
							icache.set('open', false);
							icache.set('used', true);
						}}
					>
						<div
							classes={css.dialog}
							onclick={(event) => {
								event.stopPropagation();
							}}
						>
							<div classes={css.text}>{clue}</div>
							{showAnswer ? (
								<hr styles={{ width: '99%' }} />
							) : (
								<button onclick={() => icache.set('showAnswer', true)}>Show</button>
							)}
							{showAnswer && <div classes={css.text}>{answer}</div>}
						</div>
					</div>
				</body>
			)}
		</virtual>
	);
});

export default Answer;
