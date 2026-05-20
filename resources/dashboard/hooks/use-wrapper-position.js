/**
 * External dependencies
 */
import { useEffect, useRef, useState } from '@wordpress/element';

/**
 * Custom hook to calculate and track wrapper element position
 * Updates CSS variables for fixed background positioning
 */
const useWrapperPosition = () => {
	const wrapperRef = useRef( null );
	const [ position, setPosition ] = useState( {
		'--wrapper-left': '0px',
		'--wrapper-top': '0px',
		'--wrapper-width': '0px',
	} );

	useEffect( () => {
		const updatePosition = () => {
			if ( wrapperRef.current ) {
				const rect = wrapperRef.current.getBoundingClientRect();
				setPosition( {
					'--wrapper-left': `${ rect.left }px`,
					'--wrapper-top': `${ rect.top }px`,
					'--wrapper-width': `${ rect.width }px`,
				} );
			}
		};

		// Initial calculation
		updatePosition();

		// Update on window resize
		window.addEventListener( 'resize', updatePosition );

		return () => {
			window.removeEventListener( 'resize', updatePosition );
		};
	}, [] );

	return { wrapperRef, position };
};

export default useWrapperPosition;
