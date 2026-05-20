export const STORE_SELECTORS = {
	getList(state) {
		return state.list;
	},
	getTotal(state) {
		return state.total;
	},
	getPagination(state) {
		return state.pagination;
	},
	isFetching(state) {
		return state.isFetching;
	},
};
