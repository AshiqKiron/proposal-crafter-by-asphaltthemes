import { createReduxStore, register } from '@wordpress/data';
import { STORE_RESOLVERS, STORE_ACTIONS } from './actions';
import { STORE_SELECTORS } from './selectors';
import { STORE_REDUCER } from './reducer';
import { STORE_CONTROLS } from '../utils';

register(
	createReduxStore( 'asphalt-proposal-manager/proposals', {
		reducer: STORE_REDUCER,
		actions: STORE_ACTIONS,
		selectors: STORE_SELECTORS,
		resolvers: STORE_RESOLVERS,
		controls: STORE_CONTROLS,
	} )
);
