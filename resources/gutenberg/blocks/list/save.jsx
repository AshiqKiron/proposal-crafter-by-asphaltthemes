/**
 * Internal dependencies
 */
import { BlockDiv } from '@gutenberg/block-components';

export default function save( props ) {
	const { attributes } = props;
	const Tag = attributes.htmlTag || 'ul';

	return (
		<BlockDiv.Content attributes={ attributes }>
			<Tag>
				{ attributes.content &&
					attributes.content.map( ( item, index ) => (
						<li key={ index }>{ item.li }</li>
					) ) }
			</Tag>
		</BlockDiv.Content>
	);
}
