import classes from './App.module.css';
import { Player } from './components/Player';
import { Players } from './components/Players';
import { Round } from './components/Round';
import { useAudioControls } from './hooks/audio';
import { useGameControls, useGameData, useGameStatus, useGameView } from './hooks/game';

function App() {
  const loaded = useGameStatus();
  const {
    currentRound,
    style: gameStyle,
    name: gameName,
    contestants,
    round,
    numRounds,
    setRound,
    style,
    winner,
  } = useGameData();
  useGameControls();
  useAudioControls(style);
  const view = useGameView();

  return (
    <>
      {loaded ? (
        <div className={`${classes.root} ${classes.gameStyle}`}>
          <div className={classes.header}>
            <h1 className={`${classes.title} ${classes[gameStyle]}`}>{gameName}</h1>
            {!winner && (
              <button
                className={classes.round}
                disabled={currentRound >= numRounds - 1}
                onClick={() => {
                  setRound();
                }}
              >
                <div className={classes.roundNumber}>Round {String(currentRound + 1)}</div>
                <div>{round?.name}</div>
              </button>
            )}
          </div>
          {winner ? (
            <div key="winner-view" className={classes.winner}>
              <h1>Winner</h1>
              <Player hideControls {...winner} />
            </div>
          ) : view === 'contestants' ? (
            <Players key="contestants-view" horizontal players={contestants} />
          ) : (
            <div key="game-view" className={classes.gameWrapper}>
              <Round final={round.format !== 'standard'} round={round} />
              <Players players={contestants} />
            </div>
          )}
        </div>
      ) : (
        <>LOADING</>
      )}
    </>
  );
}

export default App;
