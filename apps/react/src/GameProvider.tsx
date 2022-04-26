import { useInterpret } from '@xstate/react';
import { createContext, ReactNode } from 'react';
import { InterpreterFrom } from 'xstate';
import { gameMachine } from './machines/gameMachine';

export interface GameProviderProps {
  children?: ReactNode;
}

export const GameContext = createContext<null | { service: InterpreterFrom<typeof gameMachine> }>(null);

export function GameProvider({ children }: GameProviderProps) {
  const service = useInterpret(gameMachine, { devTools: true });
  return <GameContext.Provider value={{ service }}>{children}</GameContext.Provider>;
}
