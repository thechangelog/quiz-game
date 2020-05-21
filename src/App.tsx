import { tsx, create } from '@dojo/framework/core/vdom';
import store from './middleware/store';
import { loadGame, setCurrentRound } from './processes/game';

import Contestants from './widgets/Contestants';
import Round from './widgets/Round';
import FinalRound from './widgets/FinalRound';

import * as css from './App.m.css';

const factory = create({ store });

export default factory(function App({ middleware: { store } }) {
	const { get, path, executor } = store;

	const gameName = get(path('name'));
	if (!gameName) {
		executor(loadGame)({ url: './assets/game.json' });
		return <div key="loading">Loading</div>;
	}

	const rounds = get(path('rounds'));
	const numRounds = rounds.length;
	const currentRound = get(path('currentRound'));
	const round = rounds[currentRound];
	const contestants = get(path('contestants'));
	const view = get(path('view')) || 'game';

	return (
		<div classes={[css.root]}>
			<div classes={css.header}>
				<h1>{gameName}</h1>
				<button
					disabled={currentRound >= numRounds - 1}
					onclick={() => {
						if (currentRound < numRounds - 1) {
							executor(setCurrentRound)({ round: currentRound + 1 });
						}
					}}
				>
					Round {String(currentRound + 1)}: {round.name}
				</button>
			</div>
			{view === 'game' ? (
				<div classes={css.gameWrapper}>
					{round.format === 'standard' ? (
						<Round round={round} />
					) : (
						<FinalRound round={round} />
					)}
					<Contestants contestants={contestants} />
				</div>
			) : (
				<Contestants horizontal contestants={contestants} />
			)}
		</div>
	);
});
