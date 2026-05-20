/**
 * External dependencies
 */
import {
	getBlockType,
	registerBlockType,
	getCategories,
	setCategories,
} from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './block-editor';

setCategories([
	{
		slug: 'asphalt-proposal-manager',
		title: __('Proposal Crafter', 'asphalt-proposal-manager'),
	},
	...getCategories(),
]);
/**
 * Register all the blocks found
 */
const importAllAndRegister = (r) => {
	r.keys().forEach((key) => {
		const { settings } = r(key);

		// return if index file does not have settings
		if (!settings) return;

		const { name } = settings;

		// return if the block is already registered
		if (getBlockType(name)) return;
		/**
		 * Register the block.
		 */
		registerBlockType(name, settings);
	});
};

/**
 * import index file from src/blocks/[directory]
 */
importAllAndRegister(require.context('./blocks', true, /index\.js$/));
