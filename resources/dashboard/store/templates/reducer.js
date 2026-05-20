import { produce } from 'immer';

export const initialState = {
	list: null,
};

export const STORE_REDUCER = ( state = initialState, action ) => {
	switch ( action.type ) {
		case 'SET_LIST': {
			return produce( state, ( draft ) => {
				draft.list = action.value;
			} );
		}
	}

	return state;
};
