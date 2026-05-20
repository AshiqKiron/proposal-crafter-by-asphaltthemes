import styled from '@emotion/styled';

export const Wrapper = styled.div``;

export const FormBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: ${({ theme }) => theme.radius.xl};
`;

export const Footer = styled.div`
	display: flex;
	justify-content: flex-end;
	padding-top: 8px;
`;

export const Divider = styled.div`
	border: none;
	height: 1px;
	background-color: ${({ theme }) => theme.colors.grey100};
	margin: 0;
	padding: 0;
`;

export const ToggleSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
`;

export const ToggleWrapper = styled.div`
    .components-toggle-control {
        margin-bottom: 0;
        width: fit-content;
    }

    .components-base-control__field {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0;
    }

    .components-toggle-control__label {
        margin-right: auto;
        font-family: ${({ theme }) => theme.fonts.inter};
        font-size: 14px;
        color: ${({ theme }) => theme.colors.dark};
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
    }
`;
