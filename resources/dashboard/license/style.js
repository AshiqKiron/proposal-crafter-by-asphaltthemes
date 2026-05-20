import styled from '@emotion/styled';

// Base reusable components
const BaseText = styled.div`
	font-family: ${ ( { theme } ) => theme.fonts.inter };
	color: ${ ( { theme } ) => theme.colors.dark };
	margin: 0;
	padding: 0;
`;

const BaseContainer = styled.div`
	background-color: ${ ( { theme } ) => theme.colors.white };
	border-radius: ${ ( { theme } ) => theme.radius.xxl };
`;

const BaseButton = styled.button`
	width: 100%;
	padding: 14px 10px;
	border-radius: 4px;
	font-size: 16px;
	font-weight: 400;
	font-family: ${ ( { theme } ) => theme.fonts.inter };
	cursor: pointer;
	transition: all 0.2s ease;
	border: 1px solid;
`;

// Main layout components
export const PageWrapper = styled.div`
	max-width: 780px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 26px;
`;

export const TableRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 32px;
	margin-bottom: 20px;
`;

export const Column = styled( BaseContainer )`
	padding: 24px;
	box-shadow: 0px 4px 8px -2px #1018281a;
	display: flex;
	flex-direction: column;
`;

// Table components
export const ColumnHeader = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding-bottom: 28px;
	border-bottom: 1px solid #d9d9d9;
`;

export const PackageName = styled( BaseText )`
	font-size: 27px;
	font-weight: 400;
	line-height: 1;
`;

export const PackagePrice = styled( BaseText )`
	font-size: 27px;
	font-weight: 700;
	line-height: 1;
	display: flex;
	align-items: flex-end;
	gap: 8px;
`;

export const BilledInfo = styled( BaseText )`
	font-size: 14px;
	font-weight: 400;
	color: #667085;
	line-height: 1.3;
`;

export const PackageDescription = styled( BaseText )`
	font-size: 16px;
	font-weight: 400;
	color: #667085;
	line-height: 1.5;
`;

export const FeatureList = styled.div`
	padding: 28px 0;
	display: flex;
	flex-direction: column;
	gap: 12px;
	flex: 1;
`;

export const FeatureTitle = styled( BaseText )`
	font-size: 16px;
	font-weight: 400;
	color: #667085;
	line-height: 1.5;
`;

export const FeatureItem = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	font-size: 16px;
	font-weight: 400;
	font-family: ${ ( { theme } ) => theme.fonts.inter };
	color: #1a1a1a;
	margin: 0;
	padding: 0;
	line-height: 1.5;
`;

export const PlanButton = styled( BaseButton )`
	margin-top: auto;

	${ ( { active, theme } ) =>
		! active
			? `
        background-color: ${ theme.colors.primary };
        color: ${ theme.colors.white };
        border-color: ${ theme.colors.primary };

        &:hover {
            background-color: ${ theme.colors.primaryDeep };
        }
        
        &:focus {
            outline: none;
        }
    `
			: `
        opacity: 0.8;
        cursor: not-allowed;
        background-color: ${ theme.colors.white };
        color: #667085;
        border-color: #D0D5DD;
    ` }

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
`;

// ActivePlan components
export const ActivePlanWrapper = styled( BaseContainer )`
	padding: 24px 34px;
`;

export const ActivePlanSubtitle = styled( BaseText )`
	font-size: 14px;
	font-weight: 400;
`;

export const ActivePlanName = styled( ActivePlanSubtitle )`
	font-size: 32px;
	line-height: 1.3;
	margin-top: 12px;
`;

export const ActivePlanDescription = styled( ActivePlanSubtitle )`
	color: ${ ( { theme } ) => theme.colors.grey300 };
	margin-top: 4px;
	display: flex;
	align-items: center;
	gap: 4px;
`;

// TableHeader components
export const TableHeaderWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6px;
`;

export const TableHeaderTitle = styled( BaseText )`
	font-size: 32px;
	font-weight: 400;
	text-align: center;
	line-height: 1.3;
`;

export const TableHeaderDescription = styled( BaseText )`
	color: ${ ( { theme } ) => theme.colors.grey300 };
	text-align: center;
	font-size: 14px;
	font-weight: 400;
`;

// TableFooter components
export const TableFooterTitle = styled( BaseText )`
	font-size: 16px;
	font-weight: 400;
	margin-bottom: 6px;
`;

export const TableFooterText = styled( BaseText )`
	font-size: 14px;
	line-height: 1.5 !important;
`;
