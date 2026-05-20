/**
 * External dependencies
 */
import { useEffect } from '@wordpress/element';
import { SlotFillProvider, Slot, Fill, Panel } from '@wordpress/components';
import { select, useSelect } from '@wordpress/data';
import {
	InspectorControls,
	useBlockEditContext,
} from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import { useGlobalState } from '@gutenberg/block-editor/global-state';
import { InspectorTabContainer, TabButton } from './style';
import LayoutIcon from './icons/layout';
import StyleIcon from './icons/style';
import AdvancedIcon from './icons/advanced';

const tabs = [ 'general', 'style', 'advanced' ];

export const InspectorControlsProvider = ( props ) => {
	const { name } = useBlockEditContext();
	const selectedBlock = select( 'core/block-editor' ).getSelectedBlock();
	const [ activeTab, setActiveTab ] = useGlobalState(
		`tabCache-${ name }`,
		tabs[ 0 ]
	);
	const sidebar = useSelect( ( select ) => {
		return select( 'core/edit-post' ).isEditorSidebarOpened();
	} );

	useEffect( () => {
		if ( ! selectedBlock || ! sidebar ) {
			return;
		}

		setTimeout( () => {
			const element = document.querySelector( '.editor-sidebar__panel' );
			if ( selectedBlock.name.includes( 'asphalt-proposal-manager/' ) ) {
				element?.setAttribute( 'data-asphalt-proposal-manager-tab', activeTab );
				return;
			}

			element?.removeAttribute( 'data-asphalt-proposal-manager-tab' );
		}, 100 );
	}, [ selectedBlock, sidebar, activeTab ] );

	return (
		<>
			<InspectorControls>
				<InspectorTabContainer>
					<TabButton
						isActive={ 'general' === activeTab }
						onClick={ () => setActiveTab( 'general' ) }
					>
						<LayoutIcon />
						General
					</TabButton>
					<TabButton
						isActive={ 'style' === activeTab }
						onClick={ () => setActiveTab( 'style' ) }
					>
						<StyleIcon />
						Style
					</TabButton>
					<TabButton
						isActive={ 'advanced' === activeTab }
						onClick={ () => setActiveTab( 'advanced' ) }
					>
						<AdvancedIcon />
						Advanced
					</TabButton>
				</InspectorTabContainer>
				<SlotFillProvider>
					<Panel>
						<Slot name="ProposalCrafterPanel" />
					</Panel>
					{ props.children }
				</SlotFillProvider>
			</InspectorControls>
		</>
	);
};

export const InspectorGeneralControls = ( { children } ) => {
	const { name } = useBlockEditContext();
	const [ activeTab ] = useGlobalState( `tabCache-${ name }`, tabs[ 0 ] );

	if ( activeTab !== 'general' ) {
		return null;
	}

	return <Fill name="ProposalCrafterPanel">{ children }</Fill>;
};

export const InspectorStyleControls = ( { children } ) => {
	const { name } = useBlockEditContext();
	const [ activeTab ] = useGlobalState( `tabCache-${ name }`, tabs[ 0 ] );

	if ( activeTab !== 'style' ) {
		return null;
	}

	return <Fill name="ProposalCrafterPanel">{ children }</Fill>;
};

export const InspectorAdvancedControls = ( { children } ) => {
	const { name } = useBlockEditContext();
	const [ activeTab ] = useGlobalState( `tabCache-${ name }`, tabs[ 0 ] );

	if ( activeTab !== 'advanced' ) {
		return null;
	}

	return <Fill name="ProposalCrafterPanel">{ children }</Fill>;
};
