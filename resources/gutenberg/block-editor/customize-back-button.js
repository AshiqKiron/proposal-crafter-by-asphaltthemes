/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';

const CustomizeBackButton = () => {
    useEffect(() => {
        // Use a MutationObserver to watch for the button's appearance
        const observer = new MutationObserver((mutations) => {
            const backButton = document.querySelector(
                '.edit-post-fullscreen-mode-close'
            );

            if (backButton) {
                // Change the URL (href) to the Proposal Crafter by Asphalt Themes dashboard/list
                // Logic: core/editor does not provide a native API to change this link, so we modify the DOM.
                if (backButton.getAttribute('href') !== 'admin.php?page=asphalt-proposal-manager') {
                    backButton.setAttribute('href', 'admin.php?page=asphalt-proposal-manager');
                }

                // Optional: Change the logo image
                // const svg = backButton.querySelector('svg');
                // if (svg) {
                //     svg.style.display = 'none';
                //     // Add your custom image here if not already added
                // }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        // Initial check
        const backButton = document.querySelector(
            '.edit-post-fullscreen-mode-close'
        );
        if (backButton) {
            backButton.setAttribute('href', 'admin.php?page=asphalt-proposal-manager');
        }

        return () => observer.disconnect();
    }, []);

    return null;
};

registerPlugin('asphalt-proposal-manager-customize-back-button', {
    render: CustomizeBackButton,
});
