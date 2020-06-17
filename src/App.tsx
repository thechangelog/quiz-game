import { tsx, create } from '@dojo/framework/core/vdom';
import store from './middleware/store';
import { loadGame, setCurrentRound } from './processes/game';

import Contestants from './widgets/Contestants';
import Contestant from './widgets/Contestant';
import Round from './widgets/Round';
import FinalRound from './widgets/FinalRound';

import * as css from './App.m.css';

const factory = create({ store });

export default factory(function App({ middleware: { store } }) {
	const { get, path, executor } = store;

	const gameName = get(path('name'));
	if (!gameName) {
		executor(loadGame)({ url: './assets/halfstack.json' });
		return <div key="loading">Loading</div>;
	}

	const rounds = get(path('rounds'));
	const numRounds = rounds.length;
	const currentRound = get(path('currentRound'));
	const round = rounds[currentRound];
	const contestants = get(path('contestants'));
	const view = get(path('view')) || 'game';
	const { question: currentQuestion } = get(path('currentQuestion')) || { question: undefined };
	const winner = get(path('winner'));

	return (
		<div classes={[css.root]}>
			<div classes={css.header}>
				<h1 classes={css.title}>{gameName}</h1>
				{!winner && (
					<button
						classes={css.round}
						disabled={currentRound >= numRounds - 1}
						onclick={() => {
							if (!currentQuestion && currentRound < numRounds - 1) {
								executor(setCurrentRound)({ round: currentRound + 1 });
							}
						}}
					>
						<div classes={css.roundNumber}>Round {String(currentRound + 1)}</div>
						<div>{round.name}</div>
					</button>
				)}
			</div>
			{winner ? (
				<div key="winner-view" classes={css.winner}>
					<h1>Winner</h1>
					<Contestant contestant={winner} />
				</div>
			) : view === 'game' ? (
				<div key="game-view" classes={css.gameWrapper}>
					{round.format === 'standard' ? (
						<Round round={round} />
					) : (
						<FinalRound round={round} />
					)}
					<Contestants contestants={contestants} />
				</div>
			) : (
				<Contestants key="contestants-view" horizontal contestants={contestants} />
			)}
		</div>
	);
});
