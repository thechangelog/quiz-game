export type GameStyle = 'jsDanger' | 'goPanic';

export type GameView = 'idle' | 'game' | 'contestants';

export interface Player {
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
  style: string;
  contestants: Player[];
  rounds: Round[];
}

export interface State {
  name: string;
  style: string;
  currentRound: number;
  contestants: Player[];
  pointsAtStake: number;
  currentQuestion?: {
    category?: string;
    question?: Question;
  };
  rounds: Round[];
  view: 'game' | 'contestants';
  winner?: Player;
}
