import { produce } from 'immer';

export const initialState = {
	senderInfo: null,
	templateInfo: null,
};

export const STORE_REDUCER = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_SENDER_INFO': {
			return produce(state, (draft) => {
				draft.senderInfo = action.value;
			});
		}
		case 'SET_TEMPLATE_INFO': {
			return produce(state, (draft) => {
				draft.templateInfo = action.value;
			});
		}
	}

	return state;
};
