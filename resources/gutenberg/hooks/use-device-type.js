import {
	useSelect,
	createReduxStore,
	register,
	dispatch,
} from '@wordpress/data';

const DEVICE_TYPES = {
	desktop: 'Desktop',
	tablet: 'Tablet',
	mobile: 'Mobile',
};

export const useDeviceType = () => {
	const { deviceType } = useSelect( ( select ) => {
		let deviceType = DEVICE_TYPES.desktop;

		deviceType =
			select( 'core/editor' )?.getDeviceType?.() ||
			select(
				'core/edit-site'
			)?.__experimentalGetPreviewDeviceType?.() ||
			select(
				'core/edit-post'
			)?.__experimentalGetPreviewDeviceType?.() ||
			select( 'asphalt-proposal-manager/device-type' ).getDeviceType();

		return { deviceType };
	}, [] );

	const changeScreen = ( screen ) => {
		// In some editors, there is no edit-post / preview device type. If that
		// happens, we just set our own internal device type.
		if (
			dispatch( 'core/edit-site' ) &&
			dispatch( 'core/edit-site' ).__experimentalSetPreviewDeviceType
		) {
			dispatch( 'core/edit-site' ).__experimentalSetPreviewDeviceType(
				DEVICE_TYPES[ screen ]
			);
		} else if (
			dispatch( 'core/edit-post' ) &&
			dispatch( 'core/edit-post' ).__experimentalSetPreviewDeviceType
		) {
			dispatch( 'core/edit-post' ).__experimentalSetPreviewDeviceType(
				DEVICE_TYPES[ screen ]
			);
		} else {
			dispatch( 'asphalt-proposal-manager/device-type' ).setDeviceType(
				DEVICE_TYPES[ screen ]
			);
		}
	};

	return [ deviceType, changeScreen ];
};

/**
 * Internal store for the device type just in case the editor doesn't have one.
 */
const STORE_ACTIONS = {
	setDeviceType: ( deviceType ) => {
		return { type: 'UPDATE_DEVICE_TYPE', deviceType };
	},
};

const STORE_SELECTORS = {
	getDeviceType: ( state ) => state,
};

const STORE_REDUCER = ( state = 'Desktop', action ) => {
	switch ( action.type ) {
		case 'UPDATE_DEVICE_TYPE': {
			return action.deviceType;
		}
	}
	return state;
};

register(
	createReduxStore( 'asphalt-proposal-manager/device-type', {
		reducer: STORE_REDUCER,
		actions: STORE_ACTIONS,
		selectors: STORE_SELECTORS,
	} )
);
