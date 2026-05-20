/**
 * WordPress dependencies
 */
import { registerStore } from '@wordpress/data';
import { produce } from 'immer';
import { fetchFromAdminApi, STORE_CONTROLS } from '@dashboard/store/utils';

// Include all the stored state.
const DEFAULT_STATE = {
	records: {},
};

const STORE_ACTIONS = {
	setDetails: ( id, data ) => {
		return {
			type: 'SET_DETAILS',
			payload: {
				id,
				data,
			},
		};
	},

	setMetaData: ( id, metaKey, metaValue ) => {
		return {
			type: 'SET_META_DATA',
			payload: {
				id,
				metaKey,
				metaValue,
			},
		};
	},
};

const STORE_SELECTORS = {
	getDetails: ( state, id ) => {
		return state.records[ id ] || null;
	},
};

const STORE_REDUCER = ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case 'SET_DETAILS': {
			return produce( state, ( draft ) => {
				draft.records[ action.payload.id ] = action.payload.data;
			} );
		}

		case 'SET_META_DATA': {
			return produce( state, ( draft ) => {
				if ( ! draft.records[ action.payload.id ] ) {
					draft.records[ action.payload.id ] = {};
				}
				if ( ! draft.records[ action.payload.id ].meta ) {
					draft.records[ action.payload.id ].meta = {};
				}
				draft.records[ action.payload.id ].meta[
					action.payload.metaKey
				] = action.payload.metaValue;
			} );
		}
	}
	return state;
};

export const STORE_RESOLVERS = {
	*getDetails( id ) {
		const response = yield fetchFromAdminApi( `proposals/list/${ id }` );
		return STORE_ACTIONS.setDetails( response.data.ID, response.data );
	},
};

registerStore( 'asphalt-proposal-manager/post-type', {
	reducer: STORE_REDUCER,
	actions: STORE_ACTIONS,
	selectors: STORE_SELECTORS,
	resolvers: STORE_RESOLVERS,
	controls: STORE_CONTROLS,
} );
