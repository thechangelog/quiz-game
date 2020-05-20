import { tsx, create } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import store from './middleware/store';
import { loadGame, setCurrentQuestion, setCurrentRound, markQuestionUsed } from './processes/game';

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
	const { question: currentQuestion, category: currentCategory } = get(
		path('currentQuestion')
	) || { question: undefined, category: undefined };
	const showAnswer = icache.getOrSet('showAnswer', false);

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
			<div classes={css.gameWrapper}>
				<div key="grid" classes={css.grid}>
					{round.categories.map(({ name, questions }) => (
						<Category key={name} name={name} questions={questions} />
					))}

					{currentQuestion ? (
						<div key="currentQuestion" classes={css.currentQuestion}>
							<div
								onclick={() => {
									executor(setCurrentQuestion)({
										question: undefined,
										category: undefined
									});
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
										executor(markQuestionUsed)({
											question: currentQuestion,
											category: currentCategory
										});
									}}
									classes={css.showAnswer}
								>
									Show Answer
								</div>
							)}
						</div>
					) : ''}
				</div>
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
