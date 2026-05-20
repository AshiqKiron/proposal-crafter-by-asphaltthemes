import styled from '@emotion/styled';

export const Wrapper = styled.div`
	background-color: ${({ theme }) => theme.colors.white};
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

export const SubMenu = styled.nav`
	display: flex;
	align-items: center;
	border-bottom: 1px solid #e3e8ee;
	gap: 26px;
	margin-bottom: 24px;
`;

export const SubMenuItem = styled.a`
	padding: 0 0 10px 0;
	color: ${({ theme }) => theme.colors.grey300};
	font-size: 14px;
	font-family: ${({ theme }) => theme.fonts.inter};
	background: transparent;
	border: none;
	outline: none;
	box-shadow: none;
	cursor: pointer;
	position: relative;
	transition: color 0.3s ease;
	text-decoration: none;

	&:focus,
	&:focus-visible,
	&:active {
		outline: none;
		border: none;
		box-shadow: none;
	}

	&:hover {
		color: ${({ theme }) => theme.colors.primary};
	}

	&.active {
		color: ${({ theme }) => theme.colors.primary};

		&::after {
			transform: scaleX( 1 );
			transform-origin: left;
		}
	}

	&::after {
		content: '';
		position: absolute;
		bottom: -1px;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: ${({ theme }) => theme.colors.primary};
		transform: scaleX( 0 );
		transform-origin: right;
		transition: transform 0.3s ease;
	}
`;
