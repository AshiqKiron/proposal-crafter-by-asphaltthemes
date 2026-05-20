import styled from '@emotion/styled';
import { forwardRef } from '@wordpress/element';
import { assetsUrl } from '@dashboard/utils';

const Wrapper = styled.div`
	--border-color: ${ ( { theme, selected } ) =>
		selected ? theme.colors.primary : theme.colors.grey200 };

	--radius: ${ ( { theme } ) => theme.radius.xxl };
	--padding: 16px;
	--heading-size: 20px;

	background-color: ${ ( { theme } ) => theme.colors.white };
	border-radius: var( --radius );
	border: 1px solid var( --border-color );
	cursor: pointer;
	transition: box-shadow 0.3s ease;
	width: 100%;
	position: relative;
	transition:
		border-color 0.3s ease,
		box-shadow 0.3s ease;

	&:hover {
		--border-color: ${ ( { theme } ) => theme.colors.primary };
		box-shadow: 0px 8px 24px 0px #00000014;
	}
`;

const SelectedLabel = styled.div`
	--offset: 8px;
	position: absolute;
	top: var( --offset );
	right: var( --offset );
	background-color: ${ ( { theme } ) => theme.colors.primary };
	color: ${ ( { theme } ) => theme.colors.white };
	padding: 5px 12px 5px 5px;
	border-radius: 50px;
	font-size: 12px;
	display: flex;
	align-items: center;
	gap: 2px;
`;

const Icon = styled.img`
	--size: 18px;
	width: var( --size );
	height: var( --size );
`;

export const Card = forwardRef( ( props, ref ) => {
	return (
		<Wrapper
			ref={ ref }
			onClick={ props.onClick }
			selected={ props.selected }
			className={ props.className }
		>
			{ props.selected && (
				<SelectedLabel>
					<Icon src={ assetsUrl( 'svg/circle-check.svg' ) } />
					Selected
				</SelectedLabel>
			) }
			{ props.children }
		</Wrapper>
	);
} );

Card.Image = styled.img`
	width: 100%;
	border-top-left-radius: var( --radius );
	border-top-right-radius: var( --radius );
	height: auto;
	object-fit: cover;
	display: block;
`;

Card.Body = styled.div`
	border-top: 1px solid var( --border-color );
	padding: var( --padding );
	transition: border-color 0.3s ease;
`;

Card.Heading = styled.h3`
	font-family: ${ ( { theme } ) => theme.fonts.inter };
	color: ${ ( { theme } ) => theme.colors.dark };
	font-size: var( --heading-size ) !important;
	font-weight: 400 !important;
	margin: 0;
	line-height: 1.4;
`;

Card.Text = styled.p`
	font-family: ${ ( { theme } ) => theme.fonts.inter };
	color: ${ ( { theme } ) => theme.colors.grey300 };
	font-size: 14px;
	margin: 8px 0 0 0;
`;
