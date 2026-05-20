import styled from '@emotion/styled';

export const Wrapper = styled.div``;

export const FormBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	background-color: ${ ( { theme } ) => theme.colors.white };
	border-radius: ${ ( { theme } ) => theme.radius.xl };
`;

export const InputGroup = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 40px;
`;

export const Divider = styled.div`
	border: none;
	height: 1px;
	background-color: ${ ( { theme } ) => theme.colors.grey100 };
	margin: 0;
	padding: 0;
`;

export const Footer = styled.div`
	display: flex;
	justify-content: flex-end;
	padding-top: 8px;
`;

export const SignatureSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const SignatureTypeToggle = styled.div`
	display: flex;
	gap: 24px;
	border-bottom: 1px solid ${ ( { theme } ) => theme.colors.grey100 };
`;

export const ToggleButton = styled.button`
	padding: 0 0 12px 0;
	border: none;
	background-color: transparent;
	color: ${ ( { theme, active } ) =>
		active ? theme.colors.primary : theme.colors.grey400 };
	font-family: ${ ( { theme } ) => theme.fonts.inter };
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	position: relative;
	transition: all 0.3s ease;

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: ${ ( { theme, active } ) =>
			active ? theme.colors.primary : 'transparent' };
		transition: background-color 0.3s ease;
	}

	&:hover {
		color: ${ ( { theme } ) => theme.colors.primary };
	}

	&:focus {
		outline: none;
	}
`;

export const SignatureTextarea = styled.textarea`
	width: 100%;
	min-height: 120px;
	max-width: 320px;
	padding: 12px;
	border: 1px solid ${ ( { theme } ) => theme.colors.grey100 };
	border-radius: ${ ( { theme } ) => theme.radius.md };
	font-family: ${ ( { theme } ) => theme.fonts.inter };
	font-size: 14px;
	color: ${ ( { theme } ) => theme.colors.dark };
	resize: none;
	transition: border-color 0.3s ease;

	&:focus {
		outline: none;
		border-color: ${ ( { theme } ) => theme.colors.primary };
		box-shadow: 0 0 0 3px ${ ( { theme } ) => theme.colors.primary }20;
	}

	&::placeholder {
		color: ${ ( { theme } ) => theme.colors.grey200 };
	}
`;

export const TemplateGrid = styled.div`
	display: grid;
	grid-template-columns: repeat( 2, 1fr );
	column-gap: 40px;
	row-gap: 24px;
	margin-bottom: 24px;
`;
