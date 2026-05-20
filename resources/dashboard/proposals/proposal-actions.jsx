import { useState, useRef } from '@wordpress/element';
import { Popover } from '@wordpress/components';
import { useCopyToClipboard } from '@wordpress/compose';
import { toast } from 'react-hot-toast';
import { getEditUrl } from './utils';
import { ActionButton, ActionMenu, ActionMenuItem, MenuDivider } from './style';
import { FiMoreVertical, FiEdit3, FiCopy, FiLink, FiTrash2, FiEye } from 'react-icons/fi';

const ProposalActions = ({ proposal, onDelete }) => {
    const [isVisible, setIsVisible] = useState(false);
    const anchorRef = useRef(null);

    const toggleVisible = () => setIsVisible(!isVisible);
    const closePopover = () => setIsVisible(false);

    const handleCopySuccess = () => {
        toast.success('Link copied to clipboard');
        closePopover();
    };

    const handleDelete = () => {
        closePopover();
        if (onDelete) {
            onDelete();
        }
    };

    const copyLinkRef = useCopyToClipboard(proposal.preview_url, handleCopySuccess);

    return (
        <>
            <ActionButton
                ref={anchorRef}
                onClick={toggleVisible}
                aria-expanded={isVisible}
                aria-haspopup="true"
                active={isVisible}
            >
                <FiMoreVertical />
            </ActionButton>
            {isVisible && (
                <Popover
                    anchor={anchorRef.current}
                    position="bottom left"
                    onClose={closePopover}
                    noArrow
                    offset={2}
                >
                    <ActionMenu>
                        <ActionMenuItem
                            onClick={closePopover}
                            href={getEditUrl(proposal.ID)}
                        >
                            <FiEdit3 />
                            Edit
                        </ActionMenuItem>
                        <ActionMenuItem
                            onClick={closePopover}
                            href={proposal.preview_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FiEye />
                            Preview
                        </ActionMenuItem>
                        {/* <ActionMenuItem onClick={closePopover}>
                            <FiCopy />
                            Duplicate
                        </ActionMenuItem> */}
                        <ActionMenuItem ref={copyLinkRef}>
                            <FiLink />
                            Copy Link
                        </ActionMenuItem>
                        <MenuDivider />
                        <ActionMenuItem onClick={handleDelete} danger>
                            <FiTrash2 />
                            Delete
                        </ActionMenuItem>
                    </ActionMenu>
                </Popover>
            )}
        </>
    );
};

export default ProposalActions;
