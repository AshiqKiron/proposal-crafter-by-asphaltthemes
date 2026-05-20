import { addQueryArgs } from '@wordpress/url';

export const getEditUrl = (postId) => {
    return addQueryArgs('post.php', {
        post: postId,
        action: 'edit',
    });
};

export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Format: 12/09/2025 at 08:45 am
    return date.toLocaleDateString('en-GB') + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const formatStatus = (status) => {
    if (!status) return 'Draft';
    if (status === 'future') return 'Scheduled';
    if (status === 'publish') return 'Published';
    // Capitalize first letter
    return status.charAt(0).toUpperCase() + status.slice(1);
};

export const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const HighlightText = ({ text, highlight }) => {
    if (!highlight || !text) return text;
    const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
    const parts = text.toString().split(regex);
    return (
        <span>
            {parts.map((part, index) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <span key={index} style={{ backgroundColor: '#FEF9C3', padding: '0 1px', borderRadius: '2px' }}>
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </span>
    );
};
