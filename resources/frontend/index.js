import { acceptProposal, declineProposal } from "./proposal-status"
import signature from "./signature"
import pricing from "./pricing"

const moduleMap = {
    '.accept-proposal-btn': acceptProposal,
    '.decline-proposal-btn': declineProposal,
    '.signature-block-user-type-client': signature,
    '.wp-block-asphalt-proposal-manager-pricing': pricing,
}

jQuery(($) => {
    Object.entries(moduleMap).forEach(([selector, module]) => {
        $(selector).each((index, element) => {
            module($(element), $, index);
        })
    })
})
