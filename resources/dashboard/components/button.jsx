import styled from '@emotion/styled';

const ButtonBase = styled.button`
	border-radius: ${({ theme }) => theme.radius.md};
	font-family: ${({ theme }) => theme.fonts.inter};
	border: 0;
	outline: 0;
	cursor: pointer;
	transition:
		color 0.3s,
		border-color 0.3s,
		background-color 0.3s;
`;

export const PrimaryButton = styled(ButtonBase)`
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.white};
	padding: 10px 18px;
	font-size: 14px;

	&:hover {
		background-color: ${({ theme }) => theme.colors.primaryDeep};
	}

	&:disabled {
		background-color: ${({ theme }) => theme.colors.grey300};
		cursor: not-allowed;
	}
`;

export const PrimaryButtonFull = styled(PrimaryButton)`
	width: 100%;
	padding: 14px 20px;
`;

export const PrimaryButtonOutline = styled(ButtonBase)`
	border-width: 1px;
	border-style: solid;
	border-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.primary};
	padding: 13px 20px;
	font-size: 14px;
	background-color: transparent;

	&:hover {
		border-color: ${({ theme }) => theme.colors.primaryDeep};
		color: ${({ theme }) => theme.colors.primaryDeep};
	}
`;

export const SecondaryOutlineButton = styled(ButtonBase)`
	border-width: 1px;
	border-style: solid;
	border-color: ${({ theme }) => theme.colors.grey200};
	color: ${({ theme }) => theme.colors.dark};
	padding: 10px 20px;
	font-size: 14px;
	background-color: transparent;

	&:hover {
		border-color: ${({ theme }) => theme.colors.primary};
		color: ${({ theme }) => theme.colors.primary};
	}
`;
