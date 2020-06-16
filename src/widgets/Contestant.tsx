import { create, tsx } from '@dojo/framework/core/vdom';
import * as css from './styles/Contestant.m.css';
import { Contestant as ContestantData } from '../interfaces';
import store from '../middleware/store';
import { incrementScore, decrementScore } from '../processes/game';

export interface ContestantProperties {
	contestant: ContestantData;
	large?: boolean;
}

const factory = create({ store }).properties<ContestantProperties>();

export const Contestant = factory(function Contestant({ properties, middleware: { store } }) {
	const {
		large,
		contestant: { name, handle, score }
	} = properties();
	const currentQuestion = store.get(store.path('currentQuestion'));

	return (
		<div classes={[css.root, large && css.large]}>
			<div classes={css.actions}>
				<button
					classes={css.actionButton}
					onclick={() => {
						store.executor(incrementScore)({
							handle,
							value:
								currentQuestion && currentQuestion.question
									? currentQuestion.question.value
									: 100
						});
					}}
				>
					+
				</button>
				<button
					classes={css.actionButton}
					onclick={() => {
						store.executor(decrementScore)({
							handle,
							value:
								currentQuestion && currentQuestion.question
									? currentQuestion.question.value
									: 100
						});
					}}
				>
					-
				</button>
			</div>
			<img classes={css.avatar} src={`http://localhost:8888/?handle=${handle}`} />
			<div classes={css.info}>
				<div classes={css.name}>{name}</div>
				<div classes={[css.score, score >= 0 ? css.positive : css.negative]}>
					{String(score)}
				</div>
			</div>
		</div>
	);
});

export default Contestant;
