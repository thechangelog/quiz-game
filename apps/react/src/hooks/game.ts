import { useSelector } from '@xstate/react';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { StateFrom, StateValueMap } from 'xstate';
import { GameContext } from '../GameProvider';
import { gameMachine, GameMachineContext } from '../machines/gameMachine';
import { Category, GameView, Question } from '../types';

export const useGameService = () => {
  const context = useContext(GameContext);

  if (!context?.service) {
    throw new Error('useGameService must be used within a GameProvider');
  }

  const { service } = context;

  return service;
};

export const useGameSelector = <T>(selector: (state: StateFrom<typeof gameMachine>) => T) => {
  const service = useGameService();
  return useSelector(service, selector);
};

export const useContextValue = <T extends keyof GameMachineContext>(key: T) =>
  useGameSelector(({ context }) => context[key]);

export const useGameStatus = () => {
  const service = useGameService();
  const loaded = useSelector(service, (state) => !state.matches('load'));
  return loaded;
};

export const useGameData = () => {
  const service = useGameService();
  const contestants = useContextValue('contestants');
  const currentContestant = useContextValue('currentContestant');
  const currentQuestion = useContextValue('currentQuestion');
  const currentRound = useContextValue('currentRound');
  const name = useContextValue('name');
  const rounds = useContextValue('rounds');
  const style = useContextValue('style');
  const winner = useContextValue('winner');
  const round = useMemo(() => rounds?.[currentRound], [rounds, currentRound]);
  const numRounds = useMemo(() => rounds?.length, [rounds]);
  const setRound = useCallback(
    (round: 1 | -1 = 1) => {
      const nextRound =
        (currentRound + round) % numRounds === 0 ? 0 : currentRound + round < 0 ? numRounds - 1 : currentRound + round;
      service.send({ type: 'SET_ROUND', data: { round: nextRound } });
    },
    [numRounds, currentRound, service],
  );
  return {
    contestants,
    currentContestant,
    currentQuestion,
    currentRound,
    name,
    rounds,
    style,
    winner,
    round,
    numRounds,
    setRound,
  };
};

export const useGameView = () => {
  const service = useGameService();
  return useSelector(service, (state) => (state.value as StateValueMap)?.game as GameView);
};

export const useQuestion = () => {
  const service = useGameService();
  const currentQuestion = useSelector(service, (state) => state.context.currentQuestion);
  const selectQuestion = useCallback(
    (question: Question, category: Category) => service.send({ type: 'SELECT_QUESTION', data: { question, category } }),
    [service],
  );
  const toggleAnswer = useCallback(() => service.send({ type: 'TOGGLE_ANSWER' }), [service]);
  const showAnswer = useSelector(service, (state) => state.matches('game.question.showAnswer'));
  const closeQuestion = useCallback(() => service.send({ type: 'CLOSE_QUESTION' }), [service]);
  return {
    showAnswer,
    selectQuestion,
    toggleAnswer,
    currentQuestion,
    closeQuestion,
  };
};

export const useSendEvent = () => {
  const service = useGameService();
  return service.send;
};

export const useValue = <K extends keyof GameMachineContext, V extends GameMachineContext[K]>(key: K) =>
  useGameSelector<V>((state) => state.context[key] as V);

export const useGameControls = () => {
  const send = useSendEvent();
  const { setRound, contestants = [] } = useGameData();
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
        case 'q':
        case 'Q':
          send({ type: 'CLOSE_QUESTION' });
          break;
        case 'c':
        case 'C':
          send({ type: 'TOGGLE_CONTESTANTS' });
          break;
        case 'ArrowRight':
          setRound(1);
          break;
        case 'ArrowLeft':
          setRound(-1);
          break;
        case '1':
        case '2':
        case '3':
        case '4':
          send({ type: 'SET_WINNER', winner: contestants[Number(event.key) - 1] });
          break;
        case '0':
          send({ type: 'SET_WINNER', winner: undefined });
          break;
      }
    };
    globalThis.document.addEventListener('keyup', listener);
    return () => globalThis.document.removeEventListener('keyup', listener);
  }, [contestants]);
};
