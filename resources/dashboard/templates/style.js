import styled from '@emotion/styled';

export const Wrapper = styled.div`
	background-color: ${({ theme }) => theme.colors.white};
	// border-top-left-radius: ${({ theme }) => theme.radius.xxl};
	// border-top-right-radius: ${({ theme }) => theme.radius.xxl};
	border-radius: ${({ theme }) => theme.radius.xxl};
	padding: 32px;
	position: relative;

	// &::after {
	// 	content: '';
	// 	position: fixed;
	// 	top: var( --wrapper-top, 0 );
	// 	left: var( --wrapper-left, 0 );
	// 	width: var( --wrapper-width, 100% );
	// 	height: 100vh;
	// 	background-color: ${({ theme }) => theme.colors.white};
	// 	border-top-left-radius: ${({ theme }) => theme.radius.xxl};
	// 	border-top-right-radius: ${({ theme }) => theme.radius.xxl};
	// 	z-index: -1;
	// }
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: 24px;
	gap: 16px;
`;

export const HeaderContent = styled.div`
	max-width: 560px;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const TemplateRequestButton = styled.a`
	background-color: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.grey800};
	font-family: ${({ theme }) => theme.fonts.inter};
	display: inline-flex;
	align-items: center;
	gap: 4px;
	border-radius: ${({ theme }) => theme.radius.base};
	padding: 8px;
	box-shadow: 0px 2px 5px 0px #3c425714;
	cursor: pointer;
	text-decoration: none;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${({ theme }) => theme.colors.primaryLight};
		color: ${({ theme }) => theme.colors.grey800};
	}
`;

export const Heading = styled.h2`
	margin: 0;
	font-size: 20px;
	font-weight: 400;
	color: ${({ theme }) => theme.colors.dark};
	font-family: ${({ theme }) => theme.fonts.inter};
`;

export const Paragraph = styled.p`
	margin: 0;
	font-size: 14px;
	font-weight: 400;
	color: ${({ theme }) => theme.colors.grey300};
	font-family: ${({ theme }) => theme.fonts.inter};
`;

export const FilterHeader = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 1px solid #e3e8ee;
	gap: 26px;
	margin-bottom: 24px;
`;

export const FilterItem = styled.button`
	padding: 0 0 10px 0;
	color: ${({ active, theme }) =>
		active ? theme.colors.primary : theme.colors.grey300};
	font-size: 14px;
	font-family: ${({ theme }) => theme.fonts.inter};
	background: transparent;
	border: none;
	outline: none;
	cursor: pointer;
	position: relative;
	transition: color 0.3s ease;

	&:focus {
		outline: none;
	}

	&:hover {
		color: ${({ theme }) => theme.colors.primary};
	}

	&::after {
		content: '';
		position: absolute;
		bottom: -1px;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: ${({ theme }) => theme.colors.primary};
		transform: scaleX( ${({ active }) => (active ? 1 : 0)} );
		transform-origin: ${({ active }) => (active ? 'left' : 'right')};
		transition: transform 0.3s ease;
	}
`;

export const TemplateGrid = styled.div`
	display: grid;
	grid-template-columns: repeat( 3, 1fr );
	gap: 8px;
`;
