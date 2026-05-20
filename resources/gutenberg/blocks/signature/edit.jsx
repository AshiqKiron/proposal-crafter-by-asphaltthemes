import { compose } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
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
	const { attributes, setAttributes } = props;
	const { userType, useDefaultSenderSignature } = attributes;
	const blockCss = useBlockCssGenerator();

	const { senderInfo, defaultSignatureMedia } = useSelect( ( select ) => {
		const info = select( 'asphalt-proposal-manager/settings' ).getSenderInfo();
		const media = info?.signature_type === 'upload' && info?.signature_image
			? select( 'core' ).getMedia( info.signature_image )
			: null;
		return { senderInfo: info, defaultSignatureMedia: media };
	}, [] );

	const showDefaultPreview =
		userType === 'sender' && useDefaultSenderSignature && senderInfo;

	const defaultSignatureType = senderInfo?.signature_type || 'type';
	const defaultSignatureImage = senderInfo?.signature_image || '';
	const defaultSignatureText = senderInfo?.signature_text || '';

	return (
		<>
			{ blockCss && <style key="block-css">{ blockCss }</style> }
			<InspectorControlsProvider>
				<CommonInspectorControls />
				<Controls />
			</InspectorControlsProvider>
			<BlockDiv
				attributes={ attributes }
				className="signature-placeholder"
			>
				<div className="signature-content">
					{showDefaultPreview ? (
						<div className="signature-default-preview">
							{defaultSignatureType === 'upload' && defaultSignatureImage ? (
								<img
									src={defaultSignatureMedia?.source_url || ''}
									alt="Default Signature"
									className="signature-default-image"
									style={{ maxWidth: '100%', display: 'block' }}
								/>
							) : (
								<div className="signature-default-text">
									{defaultSignatureText || (
										<em style={{ opacity: 0.5 }}>No signature text set</em>
									)}
								</div>
							)}
							<div
								className="signature-default-badge"
								style={{
									fontSize: '11px',
									opacity: 0.6,
									marginTop: '4px',
								}}
							>
								⚙ Using default {defaultSignatureType === 'upload' ? 'image' : 'typed'} signature from global settings
							</div>
						</div>
					) : (
							<RichText
								tagName="div"
								value={attributes.placeholder}
								onChange={(value) =>
									setAttributes({ placeholder: value })
								}
								placeholder="Add Signature"
								allowedFormats={[]}
							/>
					)}
				</div>
			</BlockDiv>
		</>
	);
};

export default compose(
	withBlockAttributeContext,
	withBlockStyleContext( blockStyles )
)( edit );
