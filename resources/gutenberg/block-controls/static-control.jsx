/**
 * External dependencies
 */
import { Children, cloneElement } from '@wordpress/element';
import { camelCase } from 'lodash';
import { sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { __getValue } from '@gutenberg/utils';
import { useBlockAttributesContext } from '@gutenberg/hooks';
import { ControlBase } from './control-base';

export const StaticControl = ( props ) => {
	const blockAttributes = useBlockAttributesContext();
	const getAttrName = ( attrName = '' ) =>
		camelCase( sprintf( props.attrNameTemplate, attrName ) );
	const getValue = __getValue( blockAttributes, getAttrName, '' );

	return (
		<ControlBase label={ props.label } responsive={ false }>
			{ Children.toArray( props.children ).map( ( child ) => {
				return cloneElement( child, {
					value: getValue(),
					onChange: ( value ) => {
						if ( props.onChange ) {
							props.onChange( getAttrName(), value, '' );
						} else {
							props.setAttributes( {
								[ getAttrName() ]: value,
							} );
						}
					},
				} );
			} ) }
		</ControlBase>
	);
};

StaticControl.defaultProps = {
	attrNameTemplate: '%s',
	setAttributes: () => {},
	onChange: null,
	placeholder: '',
	label: null,
};
