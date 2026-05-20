// @ts-ignore
import { StrictMode, createRoot, render } from '@wordpress/element';
import { RouterProvider } from 'react-router-dom';
/**
 * Internal dependencies
 */
import './store';
import router from '@dashboard/routes';
import { DASHBOARD_WRAPPER_ID_SELECTOR } from '@dashboard/constants';

/**
 * form markup will be used inside of the Plugin dashboard only
 */
document.addEventListener( 'DOMContentLoaded', () => {
	const rootElement = document.getElementById(
		DASHBOARD_WRAPPER_ID_SELECTOR
	);
	if ( rootElement ) {
		if ( 'function' === typeof createRoot ) {
			createRoot( rootElement ).render(
				<StrictMode>
					<RouterProvider router={ router } />
				</StrictMode>
			);
		} else if ( 'function' === typeof render ) {
			render(
				<StrictMode>
					<RouterProvider router={ router } />
				</StrictMode>,
				rootElement
			);
		}
	}
} );
