const asphaltProposalManager = window.asphaltProposalManager;

export const assetsUrl = ( path ) => {
	return `${ asphaltProposalManager.assetsUrl }/${ path }`;
};

export const adminApiPath = ( endpoint ) => {
	return `asphalt-proposal-manager/admin/${ endpoint }`;
};
