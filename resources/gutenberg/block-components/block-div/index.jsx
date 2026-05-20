/**
 * External dependencies
 */
import classnames from 'classnames/dedupe';
import { memo } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import { useUniqueId } from '@gutenberg/hooks';
import { useQueryLoopInstanceId } from '@gutenberg/utils';
import {
	getBlockUniqueClassname,
	createUniqueClassId,
} from '@gutenberg/block-editor/guten-css/utils';

export const BlockDiv = memo( ( props ) => {
	const { clientId, attributes } = props;

	useUniqueId( attributes );

	const tempUniqueId = createUniqueClassId( clientId );
	const instanceId = useQueryLoopInstanceId(
		attributes.uniqueId || tempUniqueId
	);
	let uniqueBlockClass = getBlockUniqueClassname(
		attributes.uniqueId || tempUniqueId
	);
	uniqueBlockClass = instanceId
		? uniqueBlockClass + `-${ instanceId }`
		: uniqueBlockClass;

	const classNames = classnames( [
		{
			[ uniqueBlockClass ]: true,
		},
	] );

	const overlayClasses = classnames( [
		{
			[ `${ uniqueBlockClass }__overlay` ]: true,
		},
	] );

	return (
		<>
			<div
				{ ...useBlockProps( { className: classNames } ) }
				data-block-id={ attributes.uniqueId || tempUniqueId }
			>
				<div className={ overlayClasses }>{ props.children }</div>
			</div>
		</>
	);
} );

BlockDiv.Content = ( props ) => {
	const { attributes } = props;

	let uniqueBlockClass = getBlockUniqueClassname( attributes.uniqueId );

	const classNames = classnames( [
		{
			[ uniqueBlockClass ]: true,
		},
	] );

	const overlayClasses = classnames( [
		{
			[ `${ uniqueBlockClass }__overlay` ]: true,
		},
	] );

	return (
		<div
			{ ...useBlockProps.save( { className: classNames } ) }
			data-block-id={ attributes.uniqueId || undefined }
		>
			<div className={ overlayClasses }>{ props.children }</div>
		</div>
	);
};
