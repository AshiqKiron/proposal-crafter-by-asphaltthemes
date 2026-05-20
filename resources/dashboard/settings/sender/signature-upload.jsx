import React, { useState, useEffect } from 'react';
import { Button, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import styled from '@emotion/styled';
import { LuUpload } from 'react-icons/lu';

const UploadContainer = styled.div`
	border: 1px dashed #ccc;
	border-radius: 4px;
	padding: 20px;
	text-align: center;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 150px;
	max-width: 320px;
	cursor: ${ ( { isClickable } ) => ( isClickable ? 'pointer' : 'default' ) };
`;

const PreviewContainer = styled.div`
	position: relative;
	max-width: 100%;
`;

const PreviewImage = styled.img`
	max-width: 100%;
	max-height: 200px;
	display: block;
`;

const ButtonGroup = styled.div`
	margin-top: 10px;
	display: flex;
	gap: 10px;
	justify-content: center;
`;

const IconContainer = styled.div`
	margin-bottom: 10px;
`;

const UploadText = styled.div`
	margin-bottom: 5px;
	font-size: 14px;
	color: #1e1e1e;
`;

const StyledLinkButton = styled( Button )`
	padding: 0 !important;
	text-decoration: none !important;
	font-size: inherit !important;
	vertical-align: baseline !important;

	&:hover {
		text-decoration: underline !important;
	}
`;

const HelperText = styled.div`
	font-size: 12px;
	color: #757575;
`;

const SignatureUpload = ( { value, onChange } ) => {
	const [ imageUrl, setImageUrl ] = useState( '' );
	const [ loading, setLoading ] = useState( false );

	useEffect( () => {
		if ( value && ! imageUrl ) {
			setLoading( true );
			const attachment = wp.media.attachment( value );
			attachment
				.fetch()
				.then( () => {
					setImageUrl( attachment.get( 'url' ) );
					setLoading( false );
				} )
				.catch( () => {
					setLoading( false );
				} );
		} else if ( ! value ) {
			setImageUrl( '' );
		}
	}, [ value ] );

	const openMediaModal = () => {
		const frame = wp.media( {
			title: __( 'Select Signature', 'asphalt-proposal-manager' ),
			button: {
				text: __( 'Use this signature', 'asphalt-proposal-manager' ),
			},
			multiple: false,
			library: {
				type: 'image',
			},
		} );

		frame.on( 'select', () => {
			const attachment = frame
				.state()
				.get( 'selection' )
				.first()
				.toJSON();
			onChange( attachment.id );
			setImageUrl( attachment.url );
		} );

		frame.open();
	};

	const handleClear = ( e ) => {
		e.stopPropagation();
		onChange( '' );
		setImageUrl( '' );
	};

	return (
		<UploadContainer
			onClick={ ! imageUrl && ! loading ? openMediaModal : undefined }
			isClickable={ ! imageUrl && ! loading }
		>
			{ loading ? (
				<Spinner />
			) : imageUrl ? (
				<PreviewContainer>
					<PreviewImage
						src={ imageUrl }
						alt={ __( 'Signature Preview', 'asphalt-proposal-manager' ) }
					/>
					<ButtonGroup>
						<Button
							variant="secondary"
							onClick={ ( e ) => {
								e.stopPropagation();
								openMediaModal();
							} }
						>
							{ __( 'Edit/Change', 'asphalt-proposal-manager' ) }
						</Button>
						<Button isDestructive onClick={ handleClear }>
							{ __( 'Clear', 'asphalt-proposal-manager' ) }
						</Button>
					</ButtonGroup>
				</PreviewContainer>
			) : (
				<>
					<IconContainer>
						<LuUpload size={ 24 } />
					</IconContainer>
					<UploadText>
						<StyledLinkButton variant="link">
							{ __( 'Choose file', 'asphalt-proposal-manager' ) }
						</StyledLinkButton>{ ' ' }
						{ __( 'to upload', 'asphalt-proposal-manager' ) }
					</UploadText>
					<HelperText>
						{ __( 'TXT, PDF, DOCX', 'asphalt-proposal-manager' ) }
					</HelperText>
				</>
			) }
		</UploadContainer>
	);
};

export default SignatureUpload;
