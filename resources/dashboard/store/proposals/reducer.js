import { produce } from 'immer';

export const initialState = {
	list: null,
	total: 0,
	pagination: null,
	isFetching: false,
};

export const STORE_REDUCER = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_LIST': {
			return produce(state, (draft) => {
				draft.list = action.value.data;
				draft.total = action.value.total;
				draft.pagination = action.value.pagination;
				draft.isFetching = false;
			});
		}
		case 'SET_IS_FETCHING': {
			return produce(state, (draft) => {
				draft.isFetching = action.value;
			});
		}

	}

	return state;
};
