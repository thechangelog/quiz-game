import global from '@dojo/framework/shim/global';
import renderer, { tsx } from '@dojo/framework/core/vdom';
import { registerStoreInjector } from '@dojo/framework/stores/StoreInjector';
import Store from '@dojo/framework/stores/Store';
import { replace } from '@dojo/framework/stores/state/operations';
import { State } from './interfaces';
import '@dojo/themes/dojo/index.css';
import { playAudio, stopAudio } from './player';

import App from './App';

const store = new Store<State>();
const registry = registerStoreInjector(store);

const getNextRound = (round: 1 | -1) => {
	const { get, path } = store;
	const currentRound = get(path('currentRound'));
	const rounds = get(path('rounds'));
	return (currentRound + round) % rounds.length === 0
		? 0
		: currentRound + round < 0
		? rounds.length - 1
		: currentRound + round;
};

global.document.onkeyup = (event: KeyboardEvent) => {
	const { path, apply, get } = store;
	const contestants = get(path('contestants'));
	const style = get(path('style'));

	switch (event.key) {
		case 'Escape':
		case 'q':
		case 'Q':
			stopAudio();
			apply([replace(path('view'), 'game')]);
			break;
		case 'c':
		case 'C':
			apply([replace(path('view'), 'contestants')]);
			break;
		case 'ArrowRight':
			apply([replace(path('currentRound'), getNextRound(1))]);
			break;
		case 'ArrowLeft':
			apply([replace(path('currentRound'), getNextRound(-1))]);
			break;
		case '1':
		case '2':
		case '3':
			apply([replace(path('winner'), contestants[+event.key - 1])]);
			break;
		case '0':
			apply([replace(path('winner'), undefined)]);
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
	store.invalidate();
};

// global.window.onbeforeunload = (e: Event) => {
// 	e.preventDefault();
// 	e.returnValue = true;
// };

const r = renderer(() => <App />);
r.mount({ registry });
