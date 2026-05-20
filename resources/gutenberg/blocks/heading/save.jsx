/**
 * Internal dependencies
 */
import { BlockDiv } from '@gutenberg/block-components';

export default function save( props ) {
	const { attributes } = props;
	const Tag = attributes.htmlTag || 'h2';

	return (
		<BlockDiv.Content attributes={ attributes }>
			<Tag
				className="pc-heading"
				dangerouslySetInnerHTML={ { __html: attributes.content } }
			/>
		</BlockDiv.Content>
	);
}
