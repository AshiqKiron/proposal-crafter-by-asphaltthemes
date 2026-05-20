/**
 * External dependencies
 */
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
/**
 * Internal dependencies
 */
import { withPageWrapper, withPageLoading } from '@dashboard/higher-order';
import EmptyState from './empty-state';
import PageWrapper from './page-wrapper';
import ProposalsTable from './table';

function Proposals(props) {
	const { list, fetchList, total, pagination, isFetching } = props;

	if (total === 0) {
		return <EmptyState />;
	}

	return (
		<PageWrapper>
			<ProposalsTable
				list={list}
				fetchList={fetchList}
				total={total}
				pagination={pagination}
				isFetching={isFetching}
				deleteProposals={props.deleteProposals}
				updateStatus={props.updateStatus}
			/>
		</PageWrapper>
	);
}

const applyWithSelect = withSelect((select) => {
	const proposals = select('asphalt-proposal-manager/proposals');

	return {
		list: proposals.getList(),
		total: proposals.getTotal(), // Assuming selector exists
		pagination: proposals.getPagination(), // Assuming selector exists
		isFetching: proposals.isFetching(),
		hasFinishedResolution: proposals.hasFinishedResolution('getList'),
	};
});

const applyWithDispatch = withDispatch((dispatch) => {
	const proposals = dispatch('asphalt-proposal-manager/proposals');

	return {
		fetchList: (params) => proposals.fetchList(params),
		deleteProposals: (ids) => proposals.deleteProposals(ids),
		updateStatus: (ids, status) => proposals.updateStatus(ids, status),
	};
});

export default compose(
	withPageWrapper({
		title: 'Proposals',
	}),
	applyWithSelect,
	applyWithDispatch,
	withPageLoading()
)(Proposals);
