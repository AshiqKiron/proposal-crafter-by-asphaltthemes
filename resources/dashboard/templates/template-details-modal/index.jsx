/**
 * External dependencies
 */
import { Modal, Navigator } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { addAction, removeAction } from '@wordpress/hooks';
/**
 * Internal dependencies
 */
import {
	Wrapper,
	ModalContent,
	ImageSection,
	PreviewImage,
	InfoSection,
	Badge,
	CloseButton,
} from './style';
import Info from './info';
import InfoForm from './info-form';
import CrossIcon from './cross-icon';
import { assetsUrl } from '@dashboard/utils';

export function TemplateDetailsModal() {
	const [isOpen, setIsOpen] = useState(false);
	const [template, setTemplate] = useState(null);

	const handleOpenModal = (templateData) => {
		setTemplate(templateData);
		setIsOpen(true);
	};

	useEffect(() => {
		addAction(
			'asphalt-proposal-manager.open-template-details-modal',
			'asphalt-proposal-manager',
			handleOpenModal
		);

		return () => {
			removeAction(
				'asphalt-proposal-manager.open-template-details-modal',
				'asphalt-proposal-manager'
			);
		};
	}, []);

	return (
		<Wrapper>
			{isOpen && (
				<Modal
					__experimentalHideHeader
					className="template-details-modal"
					onRequestClose={() => setIsOpen(false)}
				>
					<CloseButton onClick={() => setIsOpen(false)}>
						<CrossIcon />
					</CloseButton>
					<ModalContent>
						<div style={{
							padding: '16px',
							backgroundColor: '#eee'
						}}>
							<ImageSection>
								{template?.package === 'paid' && (
									<Badge>
										<img
											src={assetsUrl(
												'images/white-small-star.svg'
											)}
										/>
										PRO
									</Badge>
								)}
								<PreviewImage
									src={template?.preview_image}
									alt={template?.title}
								/>
							</ImageSection>
						</div>
						<InfoSection>
							<Navigator initialPath="/">
								<Navigator.Screen path="/">
									<Info template={template} />
								</Navigator.Screen>
								<Navigator.Screen path="/info-form">
									<InfoForm template={template} setIsOpen={setIsOpen} />
								</Navigator.Screen>
							</Navigator>
						</InfoSection>
					</ModalContent>
				</Modal>
			)}
		</Wrapper>
	);
}
