/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';
/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import metadata from '@blocks/image/block.json';

export const settings = applyFilters('asphalt-proposal-manager.block.metadata', {
    ...metadata,
    edit,
    save,
});
