import { forwardRef } from '@wordpress/element';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const gridTemplate = "30px minmax(250px, 2fr) minmax(200px, 1.5fr) 100px 100px 30px";

export const Wrapper = styled.div`
	background-color: #fff;
	border-radius: 8px;
	border: 1px solid #E5E7EB;
	overflow: hidden;
`;

export const Header = styled.div`
	display: grid;
	grid-template-columns: ${gridTemplate};
	align-items: center;
	padding: 12px 20px;
	background-color: #F8FAFC;
	border-bottom: 1px solid #E2E8F0;
`;

export const HeaderItem = styled.div`
	font-family: ${({ theme }) => theme.fonts.inter};
	color: ${({ theme }) => theme.colors.dark};
	font-size: 13px;
	font-weight: 600;
	text-align: ${(props) => (props.align ? props.align : 'left')};
`;

export const Body = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Row = styled.div`
	display: grid;
	grid-template-columns: ${gridTemplate};
	align-items: center;
	padding: 10px 20px;
	border-bottom: 1px solid #F1F5F9;
	transition: background-color 0.2s;

	&:last-child {
		border-bottom: none;
	}

	&:nth-of-type(odd) {
		background-color: #FAFAFA;
	}
`;


export const TitleCell = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const ProposalTitle = styled.div`
	font-family: ${({ theme }) => theme.fonts.inter};
	font-size: 14px;
	font-weight: 500;
	color: #1E293B;
`;

export const ProposalDate = styled.div`
	font-family: ${({ theme }) => theme.fonts.inter};
	font-size: 12px;
	color: #94A3B8;
`;

export const ClientCell = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
`;

export const ClientName = styled.div`
	font-family: ${({ theme }) => theme.fonts.inter};
	font-size: 14px;
	font-weight: 500;
	color: #334155;
`;

export const ClientEmail = styled.div`
	font-family: ${({ theme }) => theme.fonts.inter};
	font-size: 12px;
	color: #64748B;
`;

export const AmountCell = styled.div`
	font-family: ${({ theme }) => theme.fonts.inter};
	font-size: 14px;
	color: #64748B;
	font-weight: 500;
`;

export const StatusBadge = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 4px 12px;
	border-radius: 9999px;
	font-family: ${({ theme }) => theme.fonts.inter};
	font-size: 12px;
	font-weight: 500;

	${({ status, theme }) => {
		const normalize = status?.toLowerCase() || '';
		let bg = '#F1F5F9';
		let text = '#475569';

		if (normalize.includes('approv')) {
			bg = '#CCFBF1'; text = '#0F766E'; // Teal
		} else if (normalize === 'publish') {
			bg = '#DCFCE7'; text = '#166534'; // Green
		} else if (normalize.includes('decline') || normalize === 'trash') {
			bg = '#FEE2E2'; text = '#991B1B'; // Red
		} else if (normalize.includes('schedule') || normalize === 'future') {
			bg = '#F3E8FF'; text = '#6B21A8'; // Purple
		} else if (normalize.includes('pending')) {
			bg = '#FFEDD5'; text = '#9A3412'; // Orange
		} else if (normalize === 'private') {
			bg = '#DBEAFE'; text = '#1E40AF'; // Blue
		}

		return `background-color: ${bg}; color: ${text};`;
	}}
`;

export const ActionButton = styled.button`
	background: ${(props) => (props.active ? '#F1F5F9' : 'transparent')};
	border: none;
	cursor: pointer;
	color: ${(props) => (props.active ? '#475569' : '#94A3B8')};
	padding: 8px 4px;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background-color: #F1F5F9;
		color: #475569;
	}

	svg {
		width: 20px;
		height: 20px;
	}
`;

export const Footer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px 24px;
	border-top: 1px solid #E2E8F0;
	background-color: #fff;
`;

export const PaginationInfo = styled.div`
	font-family: ${({ theme }) => theme.fonts.inter};
	font-size: 14px;
	color: #64748B;

	span {
		color: #1E293B;
		font-weight: 500;
	}
`;

export const PaginationButtons = styled.div`
	display: flex;
	gap: 8px;
`;

export const PageButton = styled.button`
	padding: 8px 16px;
	border-radius: 6px;
	font-family: ${({ theme }) => theme.fonts.inter};
	font-size: 14px;
	font-weight: 500;
	border: 1px solid ${(props) => props.active ? '#7B61FF' : '#E2E8F0'};
	background-color: ${(props) => props.active ? '#7B61FF' : '#fff'};
	color: ${(props) => props.active ? '#fff' : '#64748B'};
	cursor: pointer;
	transition: all 0.2s;

	&:hover {
		background-color: ${(props) => props.active ? '#6E00C4' : '#F8FAFC'};
	}
	
	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
`;

export const FilterSection = styled.div`
	display: grid;
	gap: 12px;
    grid-template-columns: 120px 250px;
	align-items: center;
`;

export const ActionSection = styled.div`
	display: grid;
	gap: 12px;
    grid-template-columns: 148px 1fr;
	align-items: center;
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
	pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
`;

const shimmer = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

export const SkeletonRow = styled(Row)`
	pointer-events: none;
`;

export const SkeletonBar = styled.div`
	background-color: #E2E8F0;
	height: 16px;
	border-radius: 4px;
	width: ${(props) => props.width || '100%'};
	animation: ${shimmer} 1.5s ease-in-out infinite;
`;

export const ActionMenu = styled.div`
	padding: 4px;
	width: 170px;
	display: flex;
	flex-direction: column;
`;

const BaseActionMenuItem = styled.button`
	display: flex;
	align-items: center;
	gap: 8px;
	width: 100%;
	padding: 9px 12px;
	border: none;
	background: transparent;
	color: ${(props) => (props.danger ? '#DC2626' : '#475569')};
	font-family: ${({ theme }) => theme.fonts.inter};
	font-size: 14px;
	font-weight: ${(props) => (props.danger ? '500' : '400')};
	cursor: pointer;
	border-radius: 4px;
	transition: background-color 0.2s;
	text-decoration: none;

	&:hover {
		background-color: ${(props) => (props.danger ? '#FEF2F2' : '#F1F5F9')};
	}

	svg {
		width: 18px;
		height: 18px;
		color: ${(props) => (props.danger ? '#DC2626' : '#94A3B8')};
	}

	&:focus {
		outline: none;
		box-shadow: none;
	}
`;

export const MenuDivider = styled.div`
	height: 1px;
	background-color: #E2E8F080;
	margin: 4px 0;
`;

export const ActionMenuItem = forwardRef((props, ref) => {
	return <BaseActionMenuItem ref={ref} as={props.href ? 'a' : 'button'} {...props} />;
});






