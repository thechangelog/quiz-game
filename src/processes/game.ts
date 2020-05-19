import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { State, Game } from '../interfaces';
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
		add(
			path('contestants'),
			contestants.reduce((acc, contestant) => {
				acc[contestant.handle] = {
					name: contestant.name,
					handle: contestant.handle,
					score: contestant.score
				};
				return acc;
			}, {} as { [name: string]: { name: string; handle: string; score: number } })
		),
		add(path('rounds'), rounds),
		add(path('name'), name),
		add(path('currentRound'), 0),
		add(path('pointsAtStake'), defaultValue)
	];
});

const incrementScoreCommand = createCommand<{ handle: string; value?: number }>(
	({ get, path, payload: { handle, value = defaultValue } }) => {
		const currentScore = get(path('contestants', handle, 'score'));
		return [replace(path('contestants', handle, 'score'), currentScore + value)];
	}
);

const decrementScoreCommand = createCommand<{ handle: string; value?: number }>(
	({ get, path, payload: { handle, value = defaultValue } }) => {
		const currentScore = get(path('contestants', handle, 'score'));
		return [replace(path('contestants', handle, 'score'), currentScore - value)];
	}
);

const setPointsAtStakeCommand = createCommand<{ value?: number }>(
	({ path, payload: { value = defaultValue } }) => {
		return [replace(path('pointsAtStake'), value)];
	}
);

const markQuestionUsedCommand = createCommand<{ round: string; category: string; value: number }>(
	({ path, payload: { round, category, value } }) => {
		return [replace(path('questionsMetadata', `${round}-${category}-${value}`, 'used'), true)];
	}
);

export const loadGame = createProcess('loadGame', [loadGameData]);
export const incrementScore = createProcess('incrementScore', [incrementScoreCommand]);
export const decrementScore = createProcess('decrementScore', [decrementScoreCommand]);
export const setPointsAtStake = createProcess('pointsAtStake', [setPointsAtStakeCommand]);
export const markQuestionUsed = createProcess('markQuestionUsed', [markQuestionUsedCommand]);
