export interface Contestant {
	name: string;
	handle: string;
	avatar?: string;
	score: number;
}

export interface Question {
	value: number;
	clue: string;
	answer: string;
	image?: string;
	extra?: string;
	used?: boolean;
}

export interface Category {
	name: string;
	hint?: string;
	questions: Question[];
}

export interface Round {
	name: string;
	format: 'standard' | 'final';
	categories: Category[];
}

export interface Game {
	name: string;
	contestants: Contestant[];
	rounds: Round[];
}

export interface State {
	name: string;
	currentRound: number;
	contestants: Contestant[];
	pointsAtStake: number;
	currentQuestion?: {
		category: string | undefined;
		question: Question | undefined;
	};
	rounds: Round[];
	view: 'game' | 'contestants';
	winner: Contestant | undefined;
}
