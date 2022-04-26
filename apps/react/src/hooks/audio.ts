import { useEffectOnce } from './utils';
import { GameStyle } from '../types';

const sounds = {
  correctAnswer: 'Correct Answer.wav',
  correctSteal: 'Correct Steal.wav',
  jsDangerStressTheme: 'JS Danger Stress Theme.wav',
  jsDangerTheme: 'JS Danger Theme.wav',
  goPanicTheme: 'Go Panic Theme.wav',
  goPanicWinner: 'Go Panic Winner.wav',
  jsDangerWinner: 'JS Danger Winner.wav',
  timesUp: 'Times Up.wav',
  wrongAnswer: 'Wrong Answer.wav',
  wrongSteal: 'Wrong Steal.wav',
} as const;

const players = new Map<string, HTMLAudioElement>();

function stopAudio() {
  players.forEach((player) => {
    player.pause();
    player.currentTime = 0;
  });
}

function playAudio(sound: keyof typeof sounds) {
  const path = `assets/${sounds[sound]}`;
  if (!players.has(path)) {
    players.set(path, new Audio(path));
  }
  const player = players.get(path)!;
  player.play();
}

export const useAudioControls = (style: GameStyle) => {
  useEffectOnce(() => {
    const listener = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
        case 'q':
        case 'Q':
          stopAudio();
          break;
        case 'b':
        case 'B':
          playAudio('timesUp');
          break;
        case 'y':
          playAudio('correctAnswer');
          break;
        case 'Y':
          playAudio('correctSteal');
          break;
        case 'n':
          playAudio('wrongAnswer');
          break;
        case 'N':
          playAudio('wrongSteal');
          break;
        case 't':
          playAudio(`${style}Theme`);
          break;
        case 'T':
          playAudio('jsDangerStressTheme');
          break;
        case 'w':
          playAudio(`${style}Winner`);
          break;
      }
    };
    globalThis.document.addEventListener('keyup', listener);
    return () => globalThis.document.removeEventListener('keyup', listener);
  });
};
