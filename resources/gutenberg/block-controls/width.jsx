/**
 * Wordpress dependencies
 */
import { BaseControl } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { Select } from './select';
import { Slider } from './slider';

function widthControl( props ) {
	switch ( props.type ) {
		case 'box':
			return '1024px';
		case 'full-width':
			return '100%';
		case 'custom':
			return 1024;
	}
}

const typeOptions = [
	{ value: 'box', label: 'Box (1024px)' },
	{ value: 'full-width', label: 'Full Width (100%)' },
	{ value: 'custom', label: 'Custom' },
];

export function Width( props ) {
	const value = props.value || {
		type: 'box',
		value: '1024px',
	};

	const onChangeType = ( val ) => {
		const newValue = {
			type: val,
			value: widthControl( { ...value, type: val } ),
		};
		props.onChange( newValue );
	};

	const onChangeValue = ( val ) => {
		const newValue = {
			type: 'custom',
			value: val,
		};
		props.onChange( newValue );
	};

	return (
		<div className="prospero-width-control">
			<BaseControl>
				<BaseControl.VisualLabel>Width Type</BaseControl.VisualLabel>
				<Select
					options={ typeOptions }
					value={ value.type }
					onChange={ onChangeType }
				/>
			</BaseControl>

			{ value.type === 'custom' && (
				<BaseControl>
					<BaseControl.VisualLabel>Width</BaseControl.VisualLabel>
					<Slider
						max={ 2000 }
						min={ 0 }
						value={ value.value }
						onChange={ onChangeValue }
					/>
				</BaseControl>
			) }
		</div>
	);
}
