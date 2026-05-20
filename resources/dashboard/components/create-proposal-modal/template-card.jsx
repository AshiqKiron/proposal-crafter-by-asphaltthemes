import styled from '@emotion/styled';
import { forwardRef } from '@wordpress/element';
import { assetsUrl } from '@dashboard/utils';

const Wrapper = styled.div`
	--border-color: ${({ theme, selected }) =>
		selected ? theme.colors.primary : theme.colors.grey200};

	--heading-color: ${({ theme, selected }) =>
		selected ? theme.colors.primary : theme.colors.dark};

	--radius: ${({ theme }) => theme.radius.lg};
	--padding: 12px;
	--heading-size: 14px;

	background-color: ${({ theme }) => theme.colors.white};
	border-radius: var( --radius );
	border: 1px solid var( --border-color );
	cursor: ${({ isComingSoon }) => (isComingSoon ? 'not-allowed' : 'pointer')};
	pointer-events: ${({ isComingSoon }) => (isComingSoon ? 'none' : 'auto')};
	width: 100%;
	position: relative;
	transition:
		border-color 0.3s ease,
		box-shadow 0.3s ease;

	&:hover {
		.blur-overlay {
			opacity: 1;
		}

		.action-buttons {
			opacity: 1;
			pointer-events: all;
			transform: translate( -50%, -50% ) scale( 0.9 );
		}
	}
`;

export const TemplateCard = forwardRef((props, ref) => {
	return (
		<Wrapper
			ref={ref}
			onClick={props.onClick}
			selected={props.selected}
			isComingSoon={props.isComingSoon}
			className={props.className}
		>
			{props.children}
		</Wrapper>
	);
});

TemplateCard.Image = styled.img`
	width: 100%;
	border-top-left-radius: var( --radius );
	border-top-right-radius: var( --radius );
	height: auto;
	object-fit: cover;
	display: block;
`;

TemplateCard.Body = styled.div`
	border-top: 1px solid var( --border-color );
	padding: var( --padding );
	transition: border-color 0.3s ease;
	opacity: ${({ isComingSoon }) => (isComingSoon ? 0.6 : 1)};
`;

TemplateCard.Heading = styled.h3`
	font-family: ${({ theme }) => theme.fonts.inter};
	color: var( --heading-color );
	font-size: var( --heading-size ) !important;
	font-weight: 400 !important;
	margin: 0;
	line-height: 1.4;
`;

const HeaderWrapper = styled.div`
	position: relative;
	border-top-left-radius: var( --radius );
	border-top-right-radius: var( --radius );
	overflow: hidden;
`;

const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 5;
	backdrop-filter: blur( 7px );
	background-color: #ffffff1a;
	opacity: 0;
	transition: opacity 0.3s ease;
	border-top-left-radius: var( --radius );
	border-top-right-radius: var( --radius );
`;

const OverlayContent = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
`;

const ProBadge = styled.div`
	position: absolute;
	top: 8px;
	right: -62px;
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

const PaidActionButtons = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate( -50%, -50% ) scale( 0.8 );
	z-index: 15;
	opacity: 0;
	pointer-events: none;
	user-select: none;
	width: 160px;
	transition:
		opacity 0.3s ease,
		pointer-events 0.3s ease,
		transform 0.2s ease;
`;

const UpgradeButton = styled.button`
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.white};
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4px;
	border: none;
	outline: none;
	font-size: 12px;
	padding: 6px;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: ${({ theme }) => theme.colors.primaryDeep};
	}

	img {
		transform: rotate( -30deg );
	}
`;

const ViewTemplateButton = styled.button`
	background-color: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.primary};
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4px;
	border: none;
	outline: none;
	font-size: 12px;
	padding: 8px 6px;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		color: ${({ theme }) => theme.colors.primaryDeep};
	}
`;

const ComingSoonBadge = styled.div`
	position: absolute;
	top: 12px;
	left: 12px;
	background: linear-gradient(
		135deg,
		${({ theme }) => theme.colors.primary},
		${({ theme }) => theme.colors.primaryDeep}
	);
	color: #ffffff;
	padding: 4px 10px;
	font-size: 11px;
	font-weight: 500;
	border-radius: 4px;
	z-index: 20;
	box-shadow: 0 4px 10px ${({ theme }) => theme.colors.primary}40;
`;

TemplateCard.Header = function TemplateCardHeader(props) {
	return (
		<HeaderWrapper className={props.className}>
			<div style={{ opacity: props.isComingSoon ? 0.6 : 1 }}>
				{props.children}
			</div>
			{props.isComingSoon && (
				<ComingSoonBadge>Coming Soon</ComingSoonBadge>
			)}
			{props.isPaid && !props.isComingSoon && (
				<>
					<Overlay className="blur-overlay" />
					<OverlayContent>
						<ProBadge>
							<img
								src={assetsUrl(
									'images/white-small-star.svg'
								)}
							/>
							PRO
						</ProBadge>
						<PaidActionButtons className="action-buttons">
							<UpgradeButton>
								<img
									src={assetsUrl(
										'images/white-small-star.svg'
									)}
								/>
								Upgrade to Unlock
							</UpgradeButton>
							<ViewTemplateButton>
								<img
									src={assetsUrl(
										'images/blue-small-eye.svg'
									)}
								/>
								View Template
							</ViewTemplateButton>
						</PaidActionButtons>
					</OverlayContent>
				</>
			)}
		</HeaderWrapper>
	);
};
