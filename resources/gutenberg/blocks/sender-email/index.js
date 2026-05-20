/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import metadata from '@blocks/sender-email/block.json';

export const settings = applyFilters( 'asphalt-proposal-manager.block.metadata', {
	...metadata,
	edit,
	save,
} );
