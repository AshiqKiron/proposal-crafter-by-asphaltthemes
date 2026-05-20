import { fetchFromAdminApi } from '../utils.js';

export const STORE_ACTIONS = {
	setList: ( value ) => {
		return { type: 'SET_LIST', value };
	},
};

export const STORE_RESOLVERS = {
	*getList() {
		const response = yield fetchFromAdminApi( 'templates/list' );
		return STORE_ACTIONS.setList( response.data );
	},
};
