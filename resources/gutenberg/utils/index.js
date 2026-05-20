import { sprintf } from '@wordpress/i18n';
import { lowerFirst } from 'lodash';
export * from './styles';

/**
 * Creates a getValue function that's used for getting attributes for style generation.
 *
 * @param {Object} attributes Block attribbutes
 * @param {Function} attrNameCallback Optional function where the attrName will be run through for formatting
 * @param {Object} defaultValue_ Value to return if the attribute value is blank. Defaults to undefined.
 *
 * @return {Function} getValue function
 */
export const __getValue =
	( attributes, attrNameCallback = null, defaultValue_ = undefined ) =>
	( attrName, format = '', defaultValue = defaultValue_ ) => {
		const attrNameFunc =
			attrNameCallback !== null
				? attrNameCallback
				: ( s ) => lowerFirst( s );
		const value =
			typeof attributes[ attrNameFunc( attrName ) ] === 'undefined'
				? ''
				: attributes[ attrNameFunc( attrName ) ];
		return value !== ''
			? format
				? sprintf( format.replace( /%([sd])%/, '%$1%%' ), value )
				: value
			: defaultValue;
	};
