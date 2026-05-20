import styled from '@emotion/styled';
import { Navigator } from '@wordpress/components';

export const Wrapper = styled.div``;

export const Header = styled.div`
	padding: 28px 28px 0 28px;
	position: relative;
`;

export const Heading = styled.h2`
	font-family: ${ ( { theme } ) => theme.fonts.inter };
	color: ${ ( { theme } ) => theme.colors.dark };
	margin: 0;
	padding: 0;
	font-weight: 400;
	font-size: 32px;
	line-height: 1.2;
`;

export const Paragraph = styled.p`
	font-family: ${ ( { theme } ) => theme.fonts.inter };
	color: ${ ( { theme } ) => theme.colors.grey300 };
	font-size: 16px;
	margin: 4px 0 0 0;
	padding: 0;
`;

export const Footer = styled.div`
	border-top: 1px solid ${ ( { theme } ) => theme.colors.grey100 };
	padding: 16px 28px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;
	align-items: center;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: ${ ( { theme } ) => theme.colors.white };
`;

export const CloseButton = styled.button`
	--size: 32px;
	width: var( --size );
	height: var( --size );
	border: none;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	position: absolute;
	top: 16px;
	right: 16px;
	background-color: ${ ( { theme } ) => theme.colors.grey100 };
	color: ${ ( { theme } ) => theme.colors.dark };
	transition: background-color 0.3s ease;
	z-index: 10;

	svg {
		transition: color 0.3s ease;
	}

	&:hover {
		background-color: ${ ( { theme } ) => theme.colors.primary };
		color: ${ ( { theme } ) => theme.colors.white };
	}
`;

export const NavigatorNextButton = styled( Navigator.Button )`
	background-color: ${ ( { theme } ) => theme.colors.primary };
	color: ${ ( { theme } ) => theme.colors.white };
	padding: 12px 20px;
	font-size: 16px;
	border-radius: ${ ( { theme } ) => theme.radius.lg };
	font-family: ${ ( { theme } ) => theme.fonts.inter };
	border: 0;
	outline: 0;
	cursor: pointer;
	height: auto;
	justify-content: center;
	transition:
		color 0.3s,
		border-color 0.3s,
		background-color 0.3s;

	&:hover {
		background-color: ${ ( { theme } ) => theme.colors.primaryDeep };
		color: ${ ( { theme } ) => theme.colors.white } !important;
	}

	&:focus {
		box-shadow: none !important;
		outline: none !important;
		border: none;
	}
`;
export const NavigatorBackButton = styled( Navigator.BackButton )`
	background-color: ${ ( { theme } ) => theme.colors.white };
	color: ${ ( { theme } ) => theme.colors.primary };
	padding: 12px 20px;
	font-size: 16px;
	border-radius: ${ ( { theme } ) => theme.radius.lg };
	font-family: ${ ( { theme } ) => theme.fonts.inter };
	border: 1px solid ${ ( { theme } ) => theme.colors.primary } !important;
	outline: 0;
	cursor: pointer;
	height: auto;
	justify-content: center;
	transition:
		color 0.3s,
		border-color 0.3s,
		background-color 0.3s;

	&:hover {
		color: ${ ( { theme } ) => theme.colors.primaryDeep } !important;
		border-color: ${ ( { theme } ) => theme.colors.primaryDeep } !important;
	}

	&:focus {
		box-shadow: none !important;
		outline: none !important;
		border: none;
	}
`;

export const Divider = styled.div`
	border: none;
	height: 1px;
	background-color: ${ ( { theme } ) => theme.colors.grey100 };
	margin: 0;
	padding: 0;
`;

export const InputGroup = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 8px;
`;

export const TemplateGrid = styled.div`
	display: grid;
	grid-template-columns: repeat( 3, 1fr );
	gap: 8px;
`;
