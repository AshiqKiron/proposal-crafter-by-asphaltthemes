import styled from '@emotion/styled';
import { Button } from '@wordpress/components';

const Container = styled.div``;
const ImageBox = styled.div`
	width: 100%;
	height: 100px;
	background: #eee;
	overflow: hidden;
	position: relative;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	span {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate( -50%, -50% );
		opacity: 0.5;
		width: 40px;
		height: 40px;

		&::before {
			font-size: 40px;
		}
	}
`;
const ButtonWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;

	button {
		display: inline-block;
		text-align: center;

		&:focus,
		&:active {
			box-shadow: none;
			outline: 0;
		}

		&:hover {
			opacity: 0.8;
		}
	}
`;

export function ImagePicker( props ) {
	const frame = wp.media( {
		title: 'Select Image',
		button: {
			text: 'Use This Image',
		},
		multiple: false,
	} );

	frame.on( 'select', function () {
		const attachment = frame.state().get( 'selection' ).first().toJSON();
		console.log( attachment.url );
		props.onChange( attachment.url );
	} );

	return (
		<Container>
			<ImageBox>
				{ props.value ? (
					<img src={ props.value } />
				) : (
					<span className="dashicons dashicons-format-image"></span>
				) }
			</ImageBox>
			<ButtonWrapper>
				<Button className="is-primary" onClick={ () => frame.open() }>
					Choose
				</Button>
				<Button
					onClick={ () => props.onChange( '' ) }
					className="is-secondary"
					disabled={ ! props.value }
				>
					Remove
				</Button>
			</ButtonWrapper>
		</Container>
	);
}
