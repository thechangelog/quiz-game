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
	const { value, clue } = properties();
	return (
		<virtual>
			<div classes={css.root} onclick={() => icache.set('open', true)}>
				<div classes={css.text}>{'' + value}</div>
			</div>
			{open && (
				<body>
					<div
						classes={css.underlay}
						onclick={(event) => {
							event.stopPropagation();
							icache.set('open', false);
						}}
					>
						<div
							classes={css.dialog}
							onclick={(event) => {
								event.stopPropagation();
							}}
						>
							<div classes={css.text}>{clue}</div>
						</div>
					</div>
				</body>
			)}
		</virtual>
	);
});

export default Answer;
