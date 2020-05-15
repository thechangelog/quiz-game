export interface Contestant {
	name: string;
	handle?: string;
	score?: number;
}

export interface Question {
	value: number;
	clue: string;
	answer: string;
	extra?: string;
}

export interface Category {
	name: string;
	hint?: string;
	questions: Question[];
}

export interface Round {
	name: string;
	format: 'standard';
	categories: Category[];
}

export interface Game {
	name: string;
	contestants: Contestant[];
	rounds: Round[];
}
