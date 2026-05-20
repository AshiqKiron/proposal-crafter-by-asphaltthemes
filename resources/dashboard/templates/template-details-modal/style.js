import styled from '@emotion/styled';

export const Wrapper = styled.div``;

export const ModalContent = styled.div`
	display: grid;
	grid-template-columns: 490px 1fr;
	gap: 0;
	font-family: ${({ theme }) => theme.fonts.inter};
	height: 100%;
	width: 900px;
`;

export const ImageSection = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	position: relative;
	overflow: hidden;
`;

export const PreviewImage = styled.img`
	width: 100%;
	height: 100%;
	display: block;
	object-fit: contain;
	border-radius: ${({ theme }) => theme.radius.lg};
`;

export const InfoSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: 16px;
	height: 100%;

	.components-navigator,
	.components-navigator-screen {
		height: 100%;
	}
`;

export const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	height: 100%;
`;

export const Badge = styled.div`
	position: absolute;
	top: 13px;
	right: -58px;
	background-color: #f3a63e;
	color: #ffffff;
	height: 24px;
	width: 180px;
	font-size: 12px;
	font-weight: 400;
	display: flex;
	align-items: center;
	justify-content: center;
	transform: rotate( 38deg );

	img {
		transform: rotate( 38deg );
	}
`;

export const Title = styled.h2`
	font-size: 24px;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.dark};
	margin: 50px 0 0 0;
	line-height: 1.3;
`;

export const Description = styled.p`
	font-size: 14px;
	color: ${({ theme }) => theme.colors.grey300};
	margin: 0;
	line-height: 1.6;
`;

export const UpgradeButton = styled.button`
	background-color: #ffa500;
	color: ${({ theme }) => theme.colors.white};
	padding: 14px 24px;
	border-radius: ${({ theme }) => theme.radius.lg};
	font-size: 16px;
	font-weight: 500;
	font-family: ${({ theme }) => theme.fonts.inter};
	border: none;
	cursor: pointer;
	transition: background-color 0.3s ease;
	margin-top: auto;

	&:hover {
		background-color: #ff8c00;
	}
`;

export const FreeButton = styled.button`
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.white};
	padding: 14px 24px;
	border-radius: ${({ theme }) => theme.radius.lg};
	font-size: 16px;
	font-weight: 500;
	font-family: ${({ theme }) => theme.fonts.inter};
	border: none;
	cursor: pointer;
	transition: background-color 0.3s ease;
	margin-top: auto;

	&:hover {
		background-color: ${({ theme }) => theme.colors.primaryDeep};
	}
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
	background-color: ${({ theme }) => theme.colors.grey100};
	color: ${({ theme }) => theme.colors.dark};
	transition: background-color 0.3s ease;
	z-index: 10;

	svg {
		transition: color 0.3s ease;
	}

	&:hover {
		background-color: ${({ theme }) => theme.colors.primary};
		color: ${({ theme }) => theme.colors.white};
	}
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
	max-width: 98%;
`;

export const FormHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-bottom: 8px;
    padding-top: 16px;
`;

export const FormTitle = styled.h2`
    font-family: ${({ theme }) => theme.fonts.inter};
    font-size: 24px;
    font-weight: 600;
    color: #1E293B;
    margin: 0;
    line-height: 1.2;
`;

export const FormDescription = styled.p`
    font-family: ${({ theme }) => theme.fonts.inter};
    font-size: 14px;
    color: #64748B;
    margin: 0;
    margin-top: 4px;
`;

export const TwoColGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
`;

export const FormFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 10px;
    padding-top: 16px;
    border-top: 1px solid #E2E8F0;
`;
