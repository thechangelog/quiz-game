import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { State, Game, Question, Contestant } from '../interfaces';
import { add, replace } from '@dojo/framework/stores/state/operations';

const defaultValue = 100;

const createCommand = createCommandFactory<State>();

const loadGameData = createCommand<{ url: string }>(async ({ path, payload: { url } }) => {
	const response = await fetch(url);
	if (response.status !== 200) {
		throw new Error(`Failed to fetch game data. url: "${url}"`);
	}
	const { contestants, rounds, name } = (await response.json()).game as Game;

	return [
		add(path('contestants'), contestants),
		add(path('rounds'), rounds),
		add(path('name'), name),
		add(path('currentRound'), 0),
		add(path('pointsAtStake'), defaultValue)
	];
});

const setCurrentRoundCommand = createCommand<{ round: number }>(({ path, payload: { round } }) => {
	return [replace(path('currentRound'), round)];
});

// scoring
const addScore = (contestants: Contestant[], handle: string, score: number) =>
	contestants.map((contestant) =>
		contestant.handle === handle
			? { ...contestant, score: contestant.score + score }
			: contestant
	);
const incrementScoreCommand = createCommand<{ handle: string; value?: number }>(
	({ get, path, payload: { handle, value = defaultValue } }) => {
		const contestants = get(path('contestants'));
		return [replace(path('contestants'), addScore(contestants, handle, value))];
	}
);
const decrementScoreCommand = createCommand<{ handle: string; value?: number }>(
	({ get, path, payload: { handle, value = defaultValue } }) => {
		const contestants = get(path('contestants'));
		return [replace(path('contestants'), addScore(contestants, handle, -value))];
	}
);

const setPointsAtStakeCommand = createCommand<{ value?: number }>(
	({ path, payload: { value = defaultValue } }) => {
		return [replace(path('pointsAtStake'), value)];
	}
);

const markQuestionUsedCommand = createCommand<{
	question: Question;
	category?: string | undefined;
}>(({ get, at, path, payload: { question, category: categoryName } }) => {
	const currentRound = get(path('currentRound'));
	const { categories } = get(at(path('rounds'), currentRound));
	const currentCategory = categories.findIndex((category) => category.name === categoryName);
	return [
		replace(
			path(
				at(path(at(path('rounds'), currentRound), 'categories'), currentCategory),
				'questions'
			),
			categories[currentCategory].questions.map((q) =>
				q === question ? { ...question, used: true } : q
			)
		)
	];
});

const setCurrentQuestionCommand = createCommand<{
	question?: Question | undefined;
	category?: string | undefined;
}>(({ path, payload: { question, category } }) => {
	return [replace(path('currentQuestion'), { question, category })];
});

export const loadGame = createProcess('loadGame', [loadGameData]);
export const setCurrentRound = createProcess('setCurrentRound', [setCurrentRoundCommand]);
export const incrementScore = createProcess('incrementScore', [incrementScoreCommand]);
export const decrementScore = createProcess('decrementScore', [decrementScoreCommand]);
export const setPointsAtStake = createProcess('pointsAtStake', [setPointsAtStakeCommand]);
export const markQuestionUsed = createProcess('markQuestionUsed', [markQuestionUsedCommand]);
export const setCurrentQuestion = createProcess('setCurrentQuestion', [setCurrentQuestionCommand]);
