import { assign, createMachine } from 'xstate';
import { Category, Player, Game, GameStyle, Question, Round } from '../types';

export interface GameMachineContext {
  name: string;
  style: GameStyle;
  currentRound: number;
  currentContestant?: Player | null;
  contestants: Player[];
  pointsAtStake: number;
  currentQuestion?: {
    category: Category;
    question: Question;
  };
  rounds: Round[];
  winner?: Player;
  url: string;
}

export type GameMachineEvent =
  | {
      type: 'SELECT_QUESTION';
      data: {
        question: Question;
        category: Category;
      };
    }
  | { type: 'TOGGLE_ANSWER' | 'TOGGLE_CONTESTANTS' | 'CLOSE_QUESTION' }
  | { type: 'SET_ROUND'; data: { round: number } }
  | { type: 'SET_WINNER'; winner: Player | undefined }
  | { type: 'INCREMENT_SCORE' | 'DECREMENT_SCORE'; handle: string; value: number }
  | { type: 'SET_CURRENT_CONTESTANT'; data: { contestant: Player } };

export const gameMachine = createMachine<GameMachineContext, GameMachineEvent>(
  {
    id: 'gameMachine',
    preserveActionOrder: true,
    initial: 'initial',
    states: {
      initial: {
        always: 'load',
      },
      load: {
        initial: 'initial',
        tags: ['loading'],
        onDone: 'game',
        states: {
          initial: {
            entry: assign({
              url: () => '/assets/tricks.json',
            }),
            always: 'loadGame',
          },
          loadGame: {
            invoke: {
              id: 'loadGame',
              src: 'loadGameData',
              onError: 'error',
              onDone: {
                target: 'done',
                actions: assign({
                  contestants: (_context, event) => event.data.contestants,
                  rounds: (_context, event) => event.data.rounds,
                  name: (_context, event) => event.data.name,
                  style: (_context, event) => event.data.style,
                  currentRound: () => 0,
                }),
              },
            },
          },
          error: {},
          done: {
            type: 'final',
          },
        },
      },
      game: {
        initial: 'idle',
        on: {
          INCREMENT_SCORE: {
            actions: assign({
              contestants: (context, event) => {
                const { contestants } = context;
                const { value, handle } = event;
                const index = contestants.findIndex((c) => c.handle === handle);
                const player = contestants[index];
                const newPlayer = { ...player, score: player.score + value };
                return [...contestants.slice(0, index), newPlayer, ...contestants.slice(index + 1)];
              },
            }),
          },
          DECREMENT_SCORE: {
            actions: assign({
              contestants: (context, event) => {
                const { contestants } = context;
                const { value, handle } = event;
                const index = contestants.findIndex((c) => c.handle === handle);
                const player = contestants[index];
                const newPlayer = { ...player, score: player.score - value };
                return [...contestants.slice(0, index), newPlayer, ...contestants.slice(index + 1)];
              },
            }),
          },
          SET_ROUND: {
            target: '.idle',
            actions: assign({
              currentRound: (_context, event) => event.data.round,
            }),
          },
          SET_WINNER: {
            target: 'winner',
            actions: assign({
              winner: (_context, event) => {
                const { winner } = event;
                console.log('WINNER', winner, event);
                return winner;
              },
            }),
          },
        },
        states: {
          idle: {
            on: {
              TOGGLE_CONTESTANTS: {
                target: 'contestants',
              },
              SELECT_QUESTION: {
                target: 'question',
                actions: assign({
                  currentQuestion: (_context, event) => {
                    const { question, category } = event.data;
                    return { question, category };
                  },
                }),
              },
            },
          },
          question: {
            initial: 'default',
            on: {
              CLOSE_QUESTION: {
                target: 'idle',
                actions: assign({
                  currentQuestion: (_context) => undefined,
                }),
              },
            },
            states: {
              default: {
                on: {
                  SET_CURRENT_CONTESTANT: {
                    actions: assign({
                      currentContestant: (_context, { data: { contestant } }) => contestant,
                    }),
                  },
                  TOGGLE_ANSWER: {
                    target: 'showAnswer',
                    actions: assign({
                      currentQuestion: ({ currentQuestion }) => {
                        if (!currentQuestion) {
                          throw new TypeError('currentQuestion is undefined');
                        }
                        const { question, category } = currentQuestion;
                        question.used = true;
                        return { question, category };
                      },
                    }),
                  },
                },
              },
              showAnswer: {
                entry: assign({
                  currentQuestion: ({ currentQuestion }) => {
                    currentQuestion!.question.used = true;
                    return currentQuestion;
                  },
                }),
                on: {
                  TOGGLE_ANSWER: {
                    target: 'default',
                    actions: assign({
                      currentQuestion: (_context) => undefined,
                      currentContestant: (_context) => undefined,
                    }),
                  },
                },
              },
            },
          },
          contestants: {
            on: {
              TOGGLE_CONTESTANTS: {
                target: 'idle',
              },
            },
          },
        },
      },
      winner: {
        type: 'final',
      },
    },
  },
  {
    services: {
      loadGameData:
        ({ url }) =>
        async () => {
          const response = await fetch(url);
          const game: Game = (await response.json()).game;
          return game;
        },
    },
  },
);

export default gameMachine;
