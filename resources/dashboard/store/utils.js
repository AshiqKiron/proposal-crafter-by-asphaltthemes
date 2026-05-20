import apiFetch from '@wordpress/api-fetch';
import { adminApiPath } from '@dashboard/utils';

export const fetchFromAdminApi = ( endpoint ) => {
	return {
		type: 'FETCH_FROM_API',
		path: adminApiPath( endpoint ),
	};
};

export const postToAdminApi = ( endpoint, data ) => {
	return {
		type: 'POST_TO_API',
		path: adminApiPath( endpoint ),
		data,
	};
};

export const STORE_CONTROLS = {
	FETCH_FROM_API( action ) {
		return apiFetch( { path: action.path } );
	},
	POST_TO_API( action ) {
		return apiFetch( {
			path: action.path,
			method: 'POST',
			data: action.data,
		} );
	},
};
