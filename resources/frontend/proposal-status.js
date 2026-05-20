import { getElements } from './helpers';
import { getSignatureMeta } from './signature';
import { isEmpty, trim } from 'lodash';
import { getCheckboxState } from './pricing';

const selectors = {
    clientSignatureEl: '.signature-block-user-type-client',
}

const validateSignature = ($clientSignatureEl) => {
    const meta = getSignatureMeta($clientSignatureEl);

    if (isEmpty(trim(meta.signatureValue))) {
        $clientSignatureEl[0].scrollIntoView({
            behavior: 'smooth'
        });

        const $signatureBlock = $clientSignatureEl.parents('.wp-block-asphalt-proposal-manager-signature');
        $signatureBlock.find('.signature-error-message').show();
        $signatureBlock.addClass('error');
        $clientSignatureEl.parents('.wp-block-asphalt-proposal-manager-container').addClass('error');

        return false;
    }

    const $signatureBlock = $clientSignatureEl.parents('.wp-block-asphalt-proposal-manager-signature');
    $signatureBlock.find('.signature-error-message').hide();
    $signatureBlock.removeClass('error');
    $clientSignatureEl.parents('.wp-block-asphalt-proposal-manager-container').removeClass('error');

    return meta;
}

const updateProposalStatus = async (endpoint, payload) => {
    try {
        const response = await fetch(`${asphaltProposalManagerFrontend.restApi}/proposals/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': asphaltProposalManagerFrontend.restNonce,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            throw data;
        }

        return data;
    } catch (error) {
        console.error(`Error processing proposal ${endpoint}:`, error);
        throw error;
    }
}

export function declineProposal($scope, $) {
    const $modal = $('#proposal-confirm-modal');
    const $confirmBtn = $modal.find('.asphalt-proposal-manager-modal-confirm');
    const $cancelBtn = $modal.find('.asphalt-proposal-manager-modal-cancel');
    const $closeBtn = $modal.find('.asphalt-proposal-manager-modal-close');
    const $overlay = $modal.find('.asphalt-proposal-manager-modal-overlay');

    const showConfirmModal = () => {
        return new Promise((resolve, reject) => {
            $modal.show();

            const cleanup = () => {
                $confirmBtn.off('click', onConfirm);
                $cancelBtn.off('click', onCancel);
                $closeBtn.off('click', onCancel);
                $overlay.off('click', onCancel);
            };

            const onConfirm = () => {
                cleanup();
                $modal.hide();
                resolve(true);
            };

            const onCancel = () => {
                cleanup();
                $modal.hide();
                resolve(false);
            };

            $confirmBtn.on('click', onConfirm);
            $cancelBtn.on('click', onCancel);
            $closeBtn.on('click', onCancel);
            $overlay.on('click', onCancel);
        });
    };

    $scope.on('click', async (e) => {
        e.preventDefault();

        const confirmed = await showConfirmModal();
        if (!confirmed) {
            return;
        }

        const $button = $(e.currentTarget);
        const originalText = $button.text();
        const payload = {
            postId: asphaltProposalManagerFrontend.postId,
        };

        $button.prop('disabled', true).text('Loading...');

        try {
            await updateProposalStatus('decline', payload);
            window.location.reload();
        } catch (error) {
            alert(error.message || 'An error occurred');
            $button.prop('disabled', false).text(originalText);
        }
    });
}

export function acceptProposal($scope, $) {
    $scope.on('click', async (e) => {
        e.preventDefault();
        const $button = $(e.currentTarget);

        const {
            $clientSignatureEl,
        } = getElements($(document), selectors);

        const payload = {
            postId: asphaltProposalManagerFrontend.postId,
            signatureType: '',
            signatureValue: '',
            signatureUserType: '',
            pricing: getCheckboxState($),
        };

        if ($clientSignatureEl.length) {
            const signatureMeta = validateSignature($clientSignatureEl);

            if (!signatureMeta) {
                return;
            }

            payload.signatureType = signatureMeta.signatureType;
            payload.signatureValue = signatureMeta.signatureValue;
            payload.signatureUserType = signatureMeta.signatureUserType;
        }

        const originalText = $button.text();
        $button.prop('disabled', true).text('Loading...');

        try {
            await updateProposalStatus('accept', payload);
            window.location.reload();
        } catch (error) {
            alert(error.message || 'An error occurred');
            $button.prop('disabled', false).text(originalText);
        }
    })
}