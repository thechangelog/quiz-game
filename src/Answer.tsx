import { create, tsx } from '@dojo/framework/core/vdom';
import * as css from './Answer.m.css';
import icache from '@dojo/framework/core/middleware/icache';

export interface AnswerProperties {
	text: string;
	points: 100 | 200 | 300 | 400 | 500;
	hint?: string;
	note?: string;
	used?: boolean;
}

const factory = create({ icache }).properties<AnswerProperties>();

export const Answer = factory(function Answer({ middleware: { icache }, properties }) {
	const open = icache.getOrSet('open', false);
	const { points, text } = properties();
	return (
		<virtual>
			<div classes={css.root} onclick={() => icache.set('open', true)}>
				<div classes={css.text}>{'' + points}</div>
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
							<div classes={css.text}>{text}</div>
						</div>
					</div>
				</body>
			)}
		</virtual>
	);
});

export default Answer;
