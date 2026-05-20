/**
 * External dependencies
 */
import { compose } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { doAction } from '@wordpress/hooks';
/**
 * Internal dependencies
 */
import withTemplateLoading from './with-template-loading';
import { TemplateCard } from './template-card';
import { TemplateGrid } from './style';

function TemplateList( props ) {
	const { templates } = props;

	const handleTemplateClick = ( template ) => {
		if ( template.coming_soon ) {
			return;
		}
		doAction( 'asphalt-proposal-manager.open-template-details-modal', template );
	};

	return (
		<TemplateGrid>
			{ templates.map( ( item ) => (
				<TemplateCard
					key={ item.id }
					onClick={ () => handleTemplateClick( item ) }
					isComingSoon={ item.coming_soon }
				>
					<TemplateCard.Header 
						isPaid={ item.package === 'paid' }
						isComingSoon={ item.coming_soon }
					>
						<TemplateCard.Image
							src={ item.thumbnail_image }
							alt={ item.title }
						/>
					</TemplateCard.Header>
					<TemplateCard.Body isComingSoon={ item.coming_soon }>
						<TemplateCard.Heading>
							{ item.title }
						</TemplateCard.Heading>
					</TemplateCard.Body>
				</TemplateCard>
			) ) }
		</TemplateGrid>
	);
}

const applyWithSelect = withSelect( ( select ) => {
	const templates = select( 'asphalt-proposal-manager/templates' );
	return {
		templates: templates.getList(),
		hasFinishedResolution: templates.hasFinishedResolution( 'getList' ),
	};
} );

export default compose(
	applyWithSelect,
	withTemplateLoading()
)( TemplateList );
