import { getElements } from './helpers';
import { isEmpty, trim } from 'lodash';

const selectors = Object.freeze({
    fileInput: '.signature-upload-input',
    filePreview: '.signature-upload-preview',
    typeInput: '.signature-type-input',
    previewWrapper: '.signature-preview-wrapper',
    uploadLabel: '.signature-upload-label',
});

export const getSignatureMeta = ($element) => {
    return {
        signatureType: $element.attr('data-signature-type'),
        signatureValue: $element.attr('data-signature-value'),
        signatureUserType: $element.attr('data-signature-user-type'),
    }
}

export default function signature($scope) {
    const {
        $fileInput,
        $filePreview,
        $typeInput,
        $previewWrapper,
        $uploadLabel,
    } = getElements($scope, selectors);

    const meta = getSignatureMeta($scope);

    // Type
    if (meta.signatureType === 'type' && $typeInput.length) {
        $typeInput.on('input', function (e) {
            if (!isEmpty(trim(e.target.value))) {
                const $signatureBlock = $scope.parents('.wp-block-asphalt-proposal-manager-signature');
                $signatureBlock.find('.signature-error-message').hide();
                $signatureBlock.removeClass('error');
                $scope.parents('.wp-block-asphalt-proposal-manager-container').removeClass('error');
            }
            $scope.attr('data-signature-value', e.target.value);
        });
    }

    // File Upload
    if (meta.signatureType === 'upload' && $fileInput.length) {
        $fileInput.on('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    $filePreview.attr('src', e.target.result);
                    if ($previewWrapper.length) {
                        $previewWrapper.show();
                    }
                    if ($filePreview.length) {
                        $filePreview.show();
                    }
                    if ($uploadLabel.length) {
                        $uploadLabel.hide();
                    }
                    const $signatureBlock = $scope.parents('.wp-block-asphalt-proposal-manager-signature');
                    $signatureBlock.find('.signature-error-message').hide();
                    $signatureBlock.removeClass('error');
                    $scope.parents('.wp-block-asphalt-proposal-manager-container').removeClass('error');
                    $scope.attr('data-signature-value', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }
}
