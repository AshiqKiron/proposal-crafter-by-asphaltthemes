import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import classnames from 'classnames/dedupe';
import { RichText } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import blockStyles from './style';
import { useBlockCssGenerator } from '@gutenberg/hooks';
import {
	withBlockAttributeContext,
	withBlockStyleContext,
} from '@gutenberg/higher-order';
import { BlockDiv } from '@gutenberg/block-components';
import {
	CommonInspectorControls,
	InspectorControlsProvider,
} from '@gutenberg/block-controls';
import Controls from './controls';

const edit = ( props ) => {
	const { attributes, postDetails, updatePageTitle, postId, setAttributes } =
		props;
	const blockCss = useBlockCssGenerator();
	const { meta } = postDetails || {};

	useEffect( () => {
		if ( meta && meta.pc_client_company ) {
			setAttributes( { content: meta.pc_client_company } );
		}
	}, [ meta?.pc_client_company ] );

	return (
		<>
			{ blockCss && <style key="block-css">{ blockCss }</style> }
			<InspectorControlsProvider>
				<CommonInspectorControls />
				<Controls />
			</InspectorControlsProvider>
			<BlockDiv attributes={ attributes }>
				<RichText
					tagName="p"
					className={ classnames( 'pc-client-company' ) }
					value={ meta?.pc_client_company || '' }
					onChange={ ( val ) => updatePageTitle( postId, val ) }
					placeholder="Enter client company..."
					keepPlaceholderOnFocus={ true }
				/>
			</BlockDiv>
		</>
	);
};

const applyWithSelect = withSelect( ( select ) => {
	const editor = select( 'core/editor' );
	const postType = select( 'asphalt-proposal-manager/post-type' );
	const postId = editor.getCurrentPostId();

	return {
		postId,
		postDetails: postType.getDetails( postId ),
	};
} );

const applyWithDispatch = withDispatch( ( dispatch, { setAttributes } ) => {
	const postType = dispatch( 'asphalt-proposal-manager/post-type' );

	return {
		updatePageTitle: ( postId, newTitle ) => {
			postType.setMetaData( postId, 'pc_client_company', newTitle );
		},
	};
} );

export default compose(
	applyWithSelect,
	applyWithDispatch,
	withBlockAttributeContext,
	withBlockStyleContext( blockStyles )
)( edit );
