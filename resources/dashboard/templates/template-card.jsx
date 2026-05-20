import styled from '@emotion/styled';
import { forwardRef } from '@wordpress/element';
import { assetsUrl } from '@dashboard/utils';

const Wrapper = styled.div`
	--border-color: ${ ( { theme, selected } ) =>
		selected ? theme.colors.primary : theme.colors.grey200 };

	--heading-color: ${ ( { theme, selected } ) =>
		selected ? theme.colors.primary : theme.colors.dark };

	--radius: ${ ( { theme } ) => theme.radius.lg };
	--padding: 12px;
	--heading-size: 14px;

	background-color: ${ ( { theme } ) => theme.colors.white };
	border-radius: var( --radius );
	border: 1px solid var( --border-color );
	cursor: ${ ( { isComingSoon } ) => ( isComingSoon ? 'not-allowed' : 'pointer' ) };
	pointer-events: ${ ( { isComingSoon } ) => ( isComingSoon ? 'none' : 'auto' ) };
	width: 100%;
	position: relative;
	transition:
		border-color 0.3s ease,
		box-shadow 0.3s ease;
`;

export const TemplateCard = forwardRef( ( props, ref ) => {
	return (
		<Wrapper
			ref={ ref }
			onClick={ props.onClick }
			selected={ props.selected }
			isComingSoon={ props.isComingSoon }
			className={ props.className }
		>
			{ props.children }
		</Wrapper>
	);
} );

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
	opacity: ${ ( { isComingSoon } ) => ( isComingSoon ? 0.6 : 1 ) };
`;

TemplateCard.Heading = styled.h3`
	font-family: ${ ( { theme } ) => theme.fonts.inter };
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

const ComingSoonBadge = styled.div`
	position: absolute;
	top: 12px;
	left: 12px;
	background: linear-gradient(
		135deg,
		${ ( { theme } ) => theme.colors.primary },
		${ ( { theme } ) => theme.colors.primaryDeep }
	);
	color: #ffffff;
	padding: 4px 10px;
	font-size: 11px;
	font-weight: 500;
	border-radius: 4px;
	z-index: 20;
	box-shadow: 0 4px 10px ${ ( { theme } ) => theme.colors.primary }40;
`;

TemplateCard.Header = function TemplateCardHeader( props ) {
	return (
		<HeaderWrapper className={ props.className }>
			<div style={ { opacity: props.isComingSoon ? 0.6 : 1 } }>
				{ props.children }
			</div>
			{ props.isComingSoon && (
				<ComingSoonBadge>Coming Soon</ComingSoonBadge>
			) }
		</HeaderWrapper>
	);
};
