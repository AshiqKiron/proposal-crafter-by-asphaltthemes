/**
 * External dependencies
 */
import { Children, cloneElement } from '@wordpress/element';
import { camelCase } from 'lodash';
import { sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { WhenResponsiveScreen } from './when-responsive-screen';
import { __getValue } from '@gutenberg/utils';
import { useBlockAttributesContext } from '@gutenberg/hooks';
import { ControlBase } from './control-base';

export const ResponsiveControl = ( props ) => {
	const blockAttributes = useBlockAttributesContext();
	const getAttrName = ( attrName = '' ) =>
		camelCase( sprintf( props.attrNameTemplate, attrName ) );
	const getValue = __getValue( blockAttributes, getAttrName, '' );
	const { screens } = props;

	return (
		<ControlBase label={ props.label } responsive={ true }>
			{ screens.includes( 'desktop' ) && (
				<WhenResponsiveScreen screens={ screens } screen="desktop">
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
				</WhenResponsiveScreen>
			) }
			{ screens.includes( 'tablet' ) && (
				<WhenResponsiveScreen screens={ screens } screen="tablet">
					{ Children.toArray( props.children ).map( ( child ) => {
						return cloneElement( child, {
							value: getValue( 'Tablet' ),
							placeholder:
								getValue( 'Tablet' ) || child.props.placeholder,
							onChange: ( value ) => {
								if ( props.onChange ) {
									props.onChange(
										getAttrName( 'Tablet' ),
										value,
										'Tablet'
									);
								} else {
									props.setAttributes( {
										[ getAttrName( 'Tablet' ) ]: value,
									} );
								}
							},
						} );
					} ) }
				</WhenResponsiveScreen>
			) }
			{ screens.includes( 'mobile' ) && (
				<WhenResponsiveScreen screens={ screens } screen="mobile">
					{ Children.toArray( props.children ).map( ( child ) => {
						return cloneElement( child, {
							value: getValue( 'Mobile' ),
							placeholder:
								getValue( 'Mobile' ) || child.props.placeholder,
							onChange: ( value ) => {
								if ( props.onChange ) {
									props.onChange(
										getAttrName( 'Mobile' ),
										value,
										'Mobile'
									);
								} else {
									props.setAttributes( {
										[ getAttrName( 'Mobile' ) ]: value,
									} );
								}
							},
						} );
					} ) }
				</WhenResponsiveScreen>
			) }
		</ControlBase>
	);
};

ResponsiveControl.defaultProps = {
	attrNameTemplate: '%s',
	setAttributes: () => {},
	onChange: null,
	placeholder: '',
	label: null,
	screens: [ 'desktop', 'tablet', 'mobile' ],
};
