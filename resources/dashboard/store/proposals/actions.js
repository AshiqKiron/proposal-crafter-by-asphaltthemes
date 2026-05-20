import { addQueryArgs } from '@wordpress/url';
import { fetchFromAdminApi, postToAdminApi } from '../utils.js';

export const STORE_ACTIONS = {
	setList: (value) => {
		return { type: 'SET_LIST', value };
	},
	setIsFetching: (value) => {
		return { type: 'SET_IS_FETCHING', value };
	},
	*fetchList(params = {}) {
		yield STORE_ACTIONS.setIsFetching(true);
		const path = addQueryArgs('proposals/list', params);
		const response = yield fetchFromAdminApi(path);
		return STORE_ACTIONS.setList(response);
	},
	*deleteProposals(ids) {
		const response = yield postToAdminApi('proposals/delete', { ids });
		return response;
	},
	*updateStatus(ids, status) {
		const response = yield postToAdminApi('proposals/status', { ids, status });
		return response;
	},
};

export const STORE_RESOLVERS = {
	*getList() {
		yield STORE_ACTIONS.setIsFetching(true);
		const response = yield fetchFromAdminApi('proposals/list');
		return STORE_ACTIONS.setList(response);
	},
};
