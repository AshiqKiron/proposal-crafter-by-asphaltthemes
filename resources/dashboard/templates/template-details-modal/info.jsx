import { useNavigator } from '@wordpress/components';
import {
    Title,
    Description,
    UpgradeButton,
    FreeButton,
    InfoWrapper,
} from './style';

export default function Info({ template }) {
    const navigator = useNavigator();

    const goNextStep = () => {
        navigator.goTo('/info-form');
    };

    return (
        <InfoWrapper>
            <Title>{template?.title || 'Template'}</Title>
            <Description>
                {template?.description ||
                    'No description available.'}
            </Description>
            {template?.package === 'paid' ? (
                <UpgradeButton>Upgrade to Unlock</UpgradeButton>
            ) : (
                <FreeButton onClick={goNextStep}>
                    Use this template - FREE
                </FreeButton>
            )}
        </InfoWrapper>
    )
}