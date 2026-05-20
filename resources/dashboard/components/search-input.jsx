import styled from '@emotion/styled';

export const SearchInput = styled.input`
	padding: 12px 16px;
	padding-right: 36px; /* Space for icon */
	border: 1px solid ${({ theme }) => theme.colors.grey200};
	border-radius: 6px;
	background-color: #fff;
	font-family: ${({ theme }) => theme.fonts.inter};
	font-size: 13px;
	color: ${({ theme }) => theme.colors.dark};
	width: 100%;
	outline: none;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%2394A3B8' class='w-6 h-6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' /%3E%3C/svg%3E");
	background-repeat: no-repeat;
	background-position: right 14px center;
	background-size: 16px;

	&:focus {
		border-color: ${({ theme }) => theme.colors.primary};
	}
`;
