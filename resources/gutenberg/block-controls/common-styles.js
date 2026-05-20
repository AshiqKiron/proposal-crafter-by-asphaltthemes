export function commonStyles(blockStyles) {
	blockStyles.addBlockStyles('background', [
		{
			selector: '.%s',
			styleRule: 'background',
			attrName: 'background',
			format: '%s',
			hasUnits: false,
			enabledCallback: (getAttribute) => {
				const background = getAttribute('background');
				if (background?.type === 'image') {
					return background?.value;
				}

				return true;
			},
			valuePreCallback(values) {
				if ('image' === values.type) {
					return `url(${values.value})`;
				}

				return values.value;
			},
		},
		{
			selector: '.%s',
			styleRule: 'background-repeat',
			attrName: 'background',
			format: '%s',
			hasUnits: false,
			enabledCallback: (getAttribute) => {
				const background = getAttribute('background');
				return background?.type === 'image' && background?.value;
			},
			valuePreCallback(values) {
				return values.repeat;
			},
		},
		{
			selector: '.%s',
			styleRule: 'background-size',
			attrName: 'background',
			format: '%s',
			hasUnits: false,
			enabledCallback: (getAttribute) => {
				const background = getAttribute('background');
				return background?.type === 'image' && background?.value;
			},
			valuePreCallback(values) {
				return values.size;
			},
		},
		{
			selector: '.%s',
			styleRule: 'background-position',
			attrName: 'background',
			format: '%s',
			hasUnits: false,
			enabledCallback: (getAttribute) => {
				const background = getAttribute('background');
				return background?.type === 'image' && background?.value;
			},
			valuePreCallback() {
				return 'top center';
			},
		},
		{
			selector: '.%s',
			styleRule: 'border-style',
			attrName: 'borderStyle',
			format: '%s',
			hasUnits: false,
		},
		{
			selector: '.%s',
			styleRule: 'border-color',
			attrName: 'borderColor',
			format: '%s',
			hasUnits: false,
		},
		{
			selector: '.%s',
			styleRule: 'border-width',
			attrName: 'borderWidth',
			responsive: 'all',
			format: '%s',
			hasUnits: false,
			valuePreCallback(values) {
				return `${values.top || 0} ${values.right || 0} ${values.bottom || 0
					} ${values.left || 0}`;
			},
		},
		{
			selector: '.%s__overlay',
			styleRule: 'background-color',
			attrName: 'backgroundOverlay',
			format: '%s',
			hasUnits: false,
		},
	]);

	blockStyles.addBlockStyles('spacing', [
		{
			selector: '.%s__overlay',
			styleRule: 'padding',
			attrName: 'padding',
			responsive: 'all',
			format: '%s',
			hasUnits: false,
			important: true,
			valuePreCallback(values) {
				return `${values.top || 0} ${values.right || 0} ${values.bottom || 0
					} ${values.left || 0}`;
			},
		},
		{
			selector: '.%s',
			styleRule: 'margin',
			attrName: 'margin',
			responsive: 'all',
			format: '%s',
			hasUnits: false,
			important: true,
			valuePreCallback(values) {
				return `${values.top || 0} ${values.right || 0} ${values.bottom || 0
					} ${values.left || 0}`;
			},
		},
	]);
}
