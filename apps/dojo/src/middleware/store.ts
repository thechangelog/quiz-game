import createStoreMiddleware from '@dojo/framework/core/middleware/store';
import { State } from '../interfaces';

export const store = createStoreMiddleware<State>();

export default store;
