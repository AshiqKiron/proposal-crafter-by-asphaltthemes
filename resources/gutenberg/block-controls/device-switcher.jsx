/**
 * External dependencies
 */
import { useState, useRef } from '@wordpress/element';
import { Popover } from '@wordpress/components';
import styled from '@emotion/styled';
/**
 * Internal dependencies
 */
import { useDeviceType } from '@gutenberg/hooks';
import DesktopIcon from './icons/desktop';
import TabletIcon from './icons/tablet';
import MobileIcon from './icons/mobile';
import { THEME } from '@dashboard/constants';

const Button = styled.button`
	background: white;
	border: 0;
	cursor: pointer;
	padding: 0 4px;
	margin: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${ ( props ) =>
		props.active ? THEME.colors.primaryDeep : THEME.colors.grey300 };

	svg {
		width: 20px;
		height: 20px;
		transform: translateY( 0.5px );
	}

	&:focus {
		outline: none;
	}

	&:hover {
		color: ${ THEME.colors.primaryDeep };
	}
`;

const Icons = {
	desktop: DesktopIcon,
	tablet: TabletIcon,
	mobile: MobileIcon,
};

const PopoverContent = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2px 0;
`;

const PopoverItem = styled.button`
	background: white;
	padding: 3px 4px;
	margin: 0;
	border: 0;
	cursor: pointer;
	transition: color 0.2s;
	color: ${ ( props ) =>
		props.active ? THEME.colors.primaryDeep : THEME.colors.grey300 };

	svg {
		width: 22px;
		height: 22px;
	}

	&:focus {
		outline: none;
	}

	&:hover {
		color: ${ THEME.colors.primaryDeep };
	}
`;

export const DeviceSwitcher = () => {
	const [ deviceType, setDeviceType ] = useDeviceType();
	const [ isVisible, setIsVisible ] = useState( false );
	const buttonRef = useRef( null );
	const ActiveIcon = Icons[ deviceType.toLowerCase() ] || Icons.desktop;

	return (
		<div>
			<Button
				onMouseDown={ () => setIsVisible( ! isVisible ) }
				title={ deviceType }
				ref={ buttonRef }
				active={ isVisible }
			>
				<ActiveIcon />
			</Button>
			{ isVisible && (
				<Popover
					onFocusOutside={ () => setIsVisible( false ) }
					onEscape={ () => setIsVisible( false ) }
					offset={ 6 }
				>
					<PopoverContent>
						<PopoverItem
							active={ deviceType.toLowerCase() === 'desktop' }
							title="Desktop"
							onClick={ () => setDeviceType( 'desktop' ) }
						>
							<DesktopIcon />
						</PopoverItem>
						<PopoverItem
							active={ deviceType.toLowerCase() === 'tablet' }
							title="Tablet"
							onClick={ () => setDeviceType( 'tablet' ) }
						>
							<TabletIcon />
						</PopoverItem>
						<PopoverItem
							active={ deviceType.toLowerCase() === 'mobile' }
							title="Mobile"
							onClick={ () => setDeviceType( 'mobile' ) }
						>
							<MobileIcon />
						</PopoverItem>
					</PopoverContent>
				</Popover>
			) }
		</div>
	);
};
