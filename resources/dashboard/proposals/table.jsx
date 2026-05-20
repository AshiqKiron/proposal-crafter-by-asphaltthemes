import { useState, useEffect, useCallback } from '@wordpress/element';
import { debounce } from 'lodash';
import { toast } from 'react-hot-toast';
import { formatDate, formatStatus, HighlightText } from './utils';
import { Checkbox, SearchInput, PrimaryButton, SearchableSelect } from '@dashboard/components';
import { CURRENCY_SYMBOLS } from '@dashboard/constants';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { SkeletonLoader } from './skeleton';
import ProposalActions from './proposal-actions';
import {
	Wrapper,
	Header,
	HeaderItem,
	Body,
	Row,
	TitleCell,
	ProposalTitle,
	ProposalDate,
	ClientCell,
	ClientName,
	ClientEmail,
	AmountCell,
	StatusBadge,
	Footer,
	PaginationInfo,
	PaginationButtons,
	PageButton,
	FilterContainer,
	FilterSection,
	ActionSection
} from './style';

const bulkOptions = Object.freeze([
	{ value: '', label: 'Bulk Actions' },
	{ value: 'delete', label: 'Delete' },
	{ value: 'draft', label: 'Mark as Draft' },
	{ value: 'pending', label: 'Mark as Pending' },
	{ value: 'private', label: 'Mark as Private' },
	{ value: 'publish', label: 'Mark as Published' },
	{ value: 'approved', label: 'Mark as Approved' },
	{ value: 'declined', label: 'Mark as Declined' },
]);

const statusOptions = Object.freeze([
	{ value: '', label: 'All' },
	{ value: 'approved', label: 'Approved' },
	{ value: 'declined', label: 'Declined' },
	{ value: 'draft', label: 'Draft' },
	{ value: 'pending', label: 'Pending' },
	{ value: 'private', label: 'Private' },
	{ value: 'future', label: 'Scheduled' },
	{ value: 'publish', label: 'Published' },
]);

function ProposalsTable(props) {
	const { list, fetchList, pagination, isFetching, total, deleteProposals, updateStatus, templateInfo } = props;
	const [selectedIds, setSelectedIds] = useState([]);
	const [filterStatus, setFilterStatus] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [bulkAction, setBulkAction] = useState('');

	const currencySymbol = CURRENCY_SYMBOLS[templateInfo?.currency] || '';

	// Debounce the search fetch to avoid too many API calls
	const debouncedFetch = useCallback(
		debounce((query, status, page) => {
			if (fetchList) {
				fetchList({ search: query, status: status, page: page, per_page: 10 });
			}
		}, 500),
		[fetchList]
	);

	// Fetch when status or page changes immediately
	useEffect(() => {
		if (fetchList) {
			fetchList({ search: searchQuery, status: filterStatus, page: currentPage, per_page: 10 });
		}
	}, [filterStatus, currentPage]);

	const handleSearchChange = (event) => {
		const query = event.target.value;
		setSearchQuery(query);
		setCurrentPage(1);
		debouncedFetch(query, filterStatus, 1);
	};

	const handleStatusChange = (selectedOption) => {
		setFilterStatus(selectedOption.value);
		setCurrentPage(1); // Reset to first page on filter change
	};

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	const handleSelectAll = (isChecked) => {
		if (isChecked) {
			const allIds = list.map((item) => item.ID);
			setSelectedIds(allIds);
		} else {
			setSelectedIds([]);
		}
	};

	const handleSelectOne = (id, isChecked) => {
		if (isChecked) {
			setSelectedIds([...selectedIds, id]);
		} else {
			setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
		}
	};

	const handleDelete = async (ids) => {
		if (!ids.length) return;

		try {
			const response = await deleteProposals(ids);
			if (response && response.success) {
				toast.success(response.message);
				setSelectedIds([]); // Clear selection
				// Refresh list
				fetchList({ search: searchQuery, status: filterStatus, page: currentPage, per_page: 10 });
			} else {
				toast.error((response && response.message) || 'Failed to delete proposals');
			}
		} catch (error) {
			toast.error(error.message || 'An error occurred');
		}
	};

	const handleStatusUpdate = async (ids, status) => {
		if (!ids.length) return;

		try {
			const response = await updateStatus(ids, status);
			if (response && response.success) {
				toast.success(response.message);
				setSelectedIds([]);
				fetchList({ search: searchQuery, status: filterStatus, page: currentPage, per_page: 10 });
			} else {
				toast.error((response && response.message) || 'Failed to update status');
			}
		} catch (error) {
			toast.error(error.message || 'An error occurred');
		}
	};

	const handleBulkApply = () => {
		if (!bulkAction) {
			return;
		}

		if (selectedIds.length === 0) {
			toast.error('Please select items first');
			return;
		}

		if (bulkAction === 'delete') {
			handleDelete(selectedIds);
		} else {
			handleStatusUpdate(selectedIds, bulkAction);
		}
	};

	const onSingleDelete = (id) => {
		handleDelete([id]);
	};

	const isAllSelected = list && list.length > 0 && selectedIds.length === list.length;

	return (
		<>
			<FilterContainer>
				<ActionSection disabled={selectedIds.length === 0}>
					<SearchableSelect
						options={bulkOptions}
						defaultValue={bulkOptions[0]}
						onChange={(option) => setBulkAction(option.value)}
						isDisabled={selectedIds.length === 0}
					/>
					<PrimaryButton onClick={handleBulkApply} disabled={selectedIds.length === 0}>Apply</PrimaryButton>
				</ActionSection>
				<FilterSection>
					<SearchableSelect
						options={statusOptions}
						defaultValue={statusOptions[0]}
						onChange={handleStatusChange}
					/>
					<SearchInput
						placeholder="Search"
						value={searchQuery}
						onChange={handleSearchChange}
					/>
				</FilterSection >
			</FilterContainer >
			<Wrapper>
				<Header>
					<HeaderItem>
						<Checkbox
							checked={isAllSelected}
							onChange={(isChecked) => handleSelectAll(isChecked)}
						/>
					</HeaderItem>
					<HeaderItem>Proposal Title</HeaderItem>
					<HeaderItem>Client Info</HeaderItem>
					<HeaderItem>Amount</HeaderItem>
					<HeaderItem>Status</HeaderItem>
					<HeaderItem align="center"></HeaderItem>
				</Header>
				<Body>
					{isFetching && <SkeletonLoader count={list?.length || 3} />}
					{!isFetching && list && list.map((proposal) => (
						<Row key={proposal.ID}>
							<div>
								<Checkbox
									checked={selectedIds.includes(proposal.ID)}
									onChange={(isChecked) => handleSelectOne(proposal.ID, isChecked)}
								/>
							</div>
							<TitleCell>
								<ProposalTitle>
									<HighlightText text={proposal.post_title || '(Untitled)'} highlight={searchQuery} />
								</ProposalTitle>
								<ProposalDate>{formatDate(proposal.post_modified)}</ProposalDate>
							</TitleCell>
							<ClientCell>
								<ClientName>
									<HighlightText text={proposal.meta?.pc_client_name || '-'} highlight={searchQuery} />
								</ClientName>
								<ClientEmail>
									<HighlightText text={proposal.meta?.pc_client_email || '-'} highlight={searchQuery} />
								</ClientEmail>
							</ClientCell>
							<AmountCell>
								{currencySymbol}{proposal.price}
							</AmountCell>
							<div>
								<StatusBadge status={proposal.post_status}>
									{formatStatus(proposal.post_status)}
								</StatusBadge>
							</div>
							<div style={{ textAlign: 'center' }}>
								<ProposalActions proposal={proposal} onDelete={() => onSingleDelete(proposal.ID)} />
							</div>
						</Row>
					))}
					{!isFetching && (!list || list.length === 0) && (
						<div style={{ padding: '24px', textAlign: 'center', color: '#64748B' }}>
							No proposals found.
						</div>
					)}
				</Body>
				<Footer>
					<PaginationInfo>
						Total <span>{total}</span> Proposals
					</PaginationInfo>
					<PaginationButtons>
						<PageButton
							onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
							disabled={currentPage === 1}
						>
							Previous
						</PageButton>
						<PageButton
							active
							onClick={() => { }} // Current page
						>
							{currentPage} / {pagination?.total || 1}
						</PageButton>
						<PageButton
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={!pagination || currentPage >= pagination.last_page}
						>
							Next
						</PageButton>
					</PaginationButtons>
				</Footer>
			</Wrapper>
		</>
	);
}

const applyWithSelect = withSelect((select) => {
	const settings = select('asphalt-proposal-manager/settings');
	return {
		templateInfo: settings.getTemplateInfo(),
	};
});

export default compose(
	applyWithSelect
)(ProposalsTable);
