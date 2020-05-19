import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import icache from '@dojo/framework/core/middleware/icache';
import dojo from '@dojo/themes/dojo';
import { Game } from './interfaces';

import Contestant from './widgets/Contestant';
import Category from './widgets/Category';

import * as css from './App.m.css';

const factory = create({ theme, icache });

export default factory(function App({ middleware: { theme, icache } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}

	const game = icache.getOrSet('game', async () => {
		const response = await fetch('./assets/game.json');

		if (response.status !== 200) {
			throw new Error('Failed to fetch game data.');
		}

		return (await response.json()).game as Game;
	});

	if (!game) {
		return <div key="loading">Loading</div>;
	}

	const currentRound = icache.getOrSet('currentRound', 0);
	const numRounds = game.rounds.length;

	return (
		<div classes={[css.root]}>
			<div>
				<h1>{game.name}</h1>
				<h2>Round {`${currentRound + 1}`}</h2>
				<button
					disabled={currentRound >= numRounds - 1}
					onclick={() => {
						if (currentRound < numRounds - 1) {
							icache.set('currentRound', currentRound + 1);
						}
					}}
				>
					Next round
				</button>
			</div>
			<div classes={css.grid}>
				{game.rounds[currentRound].categories.map((c) => (
					<Category key={c.name} {...c} />
				))}
			</div>
			<div classes={css.contestants}>
				{game.contestants.map((c) => (
					<Contestant key={c.name} name={c.name} handle={c.handle} score={c.score || 0} />
				))}
			</div>
		</div>
	);
});
