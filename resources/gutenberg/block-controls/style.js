import styled from '@emotion/styled';
import { THEME } from '@dashboard/constants';

export const InspectorTabContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	border-width: 1px 0 1px 0;
	border-style: solid;
	border-color: #ddd;
`;

export const TabButton = styled.button`
	border: 0;
	outline: 0;
	padding: 0;
	padding: 10px 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 4px;
	cursor: pointer;
	color: ${ ( { isActive } ) =>
		isActive ? THEME.colors.primary : THEME.colors.dark };
	background-color: ${ ( { isActive } ) =>
		isActive ? THEME.colors.white : '#f5f6fa' };
	border-bottom: ${ ( { isActive } ) =>
		`2.5px solid ${ isActive ? THEME.colors.primary : 'transparent;' };` };
	font-size: 12px;
	font-weight: 500;

	&:not( :last-of-type ) {
		border-right: 1px solid #ddd;
	}
`;
