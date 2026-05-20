import { fetchFromAdminApi, postToAdminApi } from '../utils.js';

export const STORE_ACTIONS = {
	setSenderInfo: (value) => {
		return { type: 'SET_SENDER_INFO', value };
	},

	*saveSenderInfo(senderData) {
		const response = yield postToAdminApi(
			'settings/sender-info',
			senderData
		);
		return STORE_ACTIONS.setSenderInfo(response.data);
	},

	setTemplateInfo: (value) => {
		return { type: 'SET_TEMPLATE_INFO', value };
	},

	*saveTemplateInfo(templateData) {
		const response = yield postToAdminApi(
			'settings/template-info',
			templateData
		);
		return STORE_ACTIONS.setTemplateInfo(templateData);
	},
};

export const STORE_RESOLVERS = {
	*getSenderInfo() {
		const response = yield fetchFromAdminApi('settings/sender-info');
		return STORE_ACTIONS.setSenderInfo(response.data);
	},

	*getTemplateInfo() {
		const response = yield fetchFromAdminApi('settings/template-info');
		return STORE_ACTIONS.setTemplateInfo(response.data);
	},
};
