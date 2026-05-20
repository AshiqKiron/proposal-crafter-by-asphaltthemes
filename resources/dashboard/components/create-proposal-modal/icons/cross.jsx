import * as React from 'react';

const CrossIcon = ( props ) => (
	<svg
		{ ...props }
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		fill="none"
		viewBox="0 0 16 16"
	>
		<path
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
			d="m12.667 3.333-9.333 9.334M12.667 12.667 3.334 3.333"
		></path>
	</svg>
);

export default CrossIcon;
