import global from '@dojo/framework/shim/global';
import renderer, { tsx } from '@dojo/framework/core/vdom';
import { registerStoreInjector } from '@dojo/framework/stores/StoreInjector';
import Store from '@dojo/framework/stores/Store';
import { replace } from '@dojo/framework/stores/state/operations';
import { State } from './interfaces';
import '@dojo/themes/dojo/index.css';

import App from './App';

const store = new Store<State>();
const registry = registerStoreInjector(store);

global.document.onkeyup = (event: KeyboardEvent) => {
	const { path, apply } = store;
	switch (event.key) {
		case 'Escape':
		case 'q':
		case 'Q':
			apply([replace(path('view'), 'game')]);
			break;
		case 'c':
		case 'C':
			apply([replace(path('view'), 'contestants')]);
			break;
	}
	store.invalidate();
};

global.window.onbeforeunload = (e: Event) => {
	e.preventDefault();
	e.returnValue = true;
};

const r = renderer(() => <App />);
r.mount({ registry });
