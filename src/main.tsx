import renderer, { tsx } from '@dojo/framework/core/vdom';
import { registerStoreInjector } from '@dojo/framework/stores/StoreInjector';
import Store from '@dojo/framework/stores/Store';
import { State } from './interfaces';
import '@dojo/themes/dojo/index.css';

import App from './App';

const store = new Store<State>();
const registry = registerStoreInjector(store);

const r = renderer(() => <App />);
r.mount({ registry });
