import { create, tsx } from '@dojo/framework/core/vdom';
import * as css from './styles/Contestant.m.css';
import { Contestant as ContestantData } from '../interfaces';
import store from '../middleware/store';
import { incrementScore, decrementScore } from '../processes/game';

export interface ContestantProperties extends ContestantData {}

const factory = create({ store }).properties<ContestantProperties>();

export const Contestant = factory(function Contestant({ properties, middleware: { store } }) {
	const { name, handle, score } = properties();
	return (
		<div classes={css.root}>
			<div classes={css.name}>{name}</div>
			<img
				classes={css.avatar}
				src={`https://avatar-redirect.appspot.com/twitter/${handle}`}
			/>
			<div classes={css.score}>{'' + score}</div>
			<div classes={css.actions}>
				<button
					onclick={() => {
						store.executor(incrementScore)({ handle });
					}}
				>
					+
				</button>
				<button
					onclick={() => {
						store.executor(decrementScore)({ handle });
					}}
				>
					-
				</button>
			</div>
		</div>
	);
});

export default Contestant;
