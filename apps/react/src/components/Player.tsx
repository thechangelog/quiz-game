import { useCallback } from 'react';
import { useSendEvent, useValue } from '../hooks/game';
import { Player as PlayerData } from '../types';
import classes from './Player.module.css';

export interface PlayerProps extends PlayerData {
  large?: boolean;
  hideControls?: boolean;
}

export const usePlayer = (player: PlayerData) => {
  const send = useSendEvent();
  const currentQuestion = useValue('currentQuestion');
  const increment = useCallback(
    (value?: number) => {
      send({ type: 'INCREMENT_SCORE', handle: player.handle, value: value ?? currentQuestion?.question.value ?? 100 });
    },
    [send, player],
  );
  const decrement = useCallback(
    (value?: number) => {
      send({ type: 'DECREMENT_SCORE', handle: player.handle, value: value ?? currentQuestion?.question.value ?? 100 });
    },
    [send, player],
  );
  return {
    increment,
    decrement,
  };
};

export function Player({ large, name, handle, avatar, score, hideControls }: PlayerProps) {
  const { increment, decrement } = usePlayer({ handle, avatar, name, score });
  return (
    <div className={`${classes.root} ${large ? classes.large : ''}`}>
      {!hideControls && (
        <div className="actions">
          <button className={classes.actionButton} onClick={() => increment()}>
            +
          </button>
          <button className={classes.actionButton} onClick={() => decrement()}>
            -
          </button>
        </div>
      )}
      <img className={classes.avatar} src={avatar ?? `http://localhost:8888/?handle=${handle}`} />
      <div className={classes.info}>
        <div className={classes.name}>{name}</div>
        <div className={`${classes.score}, ${score >= 0 ? classes.positive : classes.negative}`}>{String(score)}</div>
      </div>
    </div>
  );
}
