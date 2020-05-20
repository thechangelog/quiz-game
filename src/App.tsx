import { tsx, create } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import store from './middleware/store';
import { loadGame, setCurrentQuestion } from './processes/game';

import Contestant from './widgets/Contestant';
import Category from './widgets/Category';

import * as css from './App.m.css';

const factory = create({ icache, store });

export default factory(function App({ middleware: { icache, store } }) {
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
	const currentQuestion = get(path('currentQuestion'));
	const showAnswer = icache.getOrSet('showAnswer', false);

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
				{currentQuestion ? (
					<div classes={css.currentQuestion}>
						<div
							onclick={() => {
								executor(setCurrentQuestion)({ question: undefined });
								icache.set('showAnswer', false);
							}}
							classes={css.clue}
						>
							{currentQuestion.clue}
						</div>
						{showAnswer ? (
							<div classes={css.answer}>{currentQuestion.answer}</div>
						) : (
							<div
								onclick={() => {
									icache.set('showAnswer', true);
								}}
								classes={css.showAnswer}
							>
								Show answer
							</div>
						)}
					</div>
				) : (
					<div classes={css.grid}>
						{round.categories.map(({ name, questions }) => (
							<Category key={name} name={name} questions={questions} />
						))}
					</div>
				)}
				<div classes={css.contestants}>
					{contestants.map((c) => (
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
