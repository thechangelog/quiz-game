import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import icache from '@dojo/framework/core/middleware/icache';
import store from './middleware/store';
import dojo from '@dojo/themes/dojo';
import { loadGame } from './processes/game';

import Contestant from './widgets/Contestant';
import Category from './widgets/Category';

import * as css from './App.m.css';

const factory = create({ theme, icache, store });

export default factory(function App({ middleware: { theme, icache, store } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}

	const { get, path, executor } = store;

	const gameName = get(path('name'));
	if (!gameName) {
		executor(loadGame)({ url: './assets/game.json' });
		return <div key="loading">Loading</div>;
	}

	const rounds = get(path('rounds'));
	const numRounds = rounds.length;
	const currentRound = get(path('currentRound'));
	const contestants = get(path('contestants'));

	return (
		<div classes={[css.root]}>
			<div>
				<h1>{gameName}</h1>
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
			<div classes={css.gameWrapper}>
				<div classes={css.grid}>
					{rounds[currentRound].categories.map((c) => (
						<Category key={c.name} {...c} />
					))}
				</div>
				<div classes={css.contestants}>
					{Object.values(contestants).map((c) => (
						<Contestant
							key={c.name}
							name={c.name}
							handle={c.handle}
							score={c.score || 0}
						/>
					))}
				</div>
			</div>
		</div>
	);
});
