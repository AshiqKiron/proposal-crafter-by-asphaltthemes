/**
 * Internal dependencies
 */
import { BlockDiv } from '@gutenberg/block-components';

export default function save( props ) {
	const { attributes } = props;
	const Tag = attributes.htmlTag || 'p';

	return (
		<BlockDiv.Content attributes={ attributes }>
			<Tag
				className="pc-paragraph"
				dangerouslySetInnerHTML={ { __html: attributes.content } }
			/>
		</BlockDiv.Content>
	);
}
