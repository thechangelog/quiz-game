import { Player as ContestantType } from '../types';
import { Player } from './Player';
import classes from './Players.module.css';

export interface PlayersProps {
  players: ContestantType[];
  horizontal?: boolean;
}

export const Players = ({ players, horizontal }: PlayersProps) => (
  <div className={`${classes.root} ${horizontal ? classes.horizontal : ''}`}>
    {players.map((contestant) => (
      <Player large={horizontal} {...contestant} key={contestant.name} />
    ))}
  </div>
);
