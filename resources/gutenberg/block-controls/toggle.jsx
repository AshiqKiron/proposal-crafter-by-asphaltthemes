import { ToggleControl } from '@wordpress/components';

export const Toggle = ({ value, ...props }) => {
    return <ToggleControl checked={value} {...props} />;
};
