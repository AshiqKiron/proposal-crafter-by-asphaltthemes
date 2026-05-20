import {
	TableRow,
	Column,
	ColumnHeader,
	PackageName,
	PackagePrice,
	BilledInfo,
	PackageDescription,
	FeatureList,
	FeatureTitle,
	FeatureItem,
	PlanButton,
} from './style';
import { assetsUrl } from '@dashboard/utils';

const Icon = ( { status } ) => {
	const iconSrc = status ? 'check-icon.svg' : 'cross-icon.svg';
	return (
		<img
			width={ 26 }
			height={ 26 }
			alt="icon"
			src={ assetsUrl( `svg/${ iconSrc }` ) }
		/>
	);
};

export default function TableBody() {
	return (
		<TableRow>
			<Column>
				<ColumnHeader>
					<PackageName>Free</PackageName>
					<PackagePrice>$0</PackagePrice>
					<PackageDescription>
						Get your proposal game running with unlimited free
						proposals
					</PackageDescription>
				</ColumnHeader>
				<FeatureList>
					<FeatureTitle>Free forever</FeatureTitle>
					<FeatureItem>
						<Icon status={ true }></Icon>
						Own your data
					</FeatureItem>
					<FeatureItem>
						<Icon status={ true }></Icon>
						Unlimited proposals
					</FeatureItem>
					<FeatureItem>
						<Icon status={ true }></Icon>
						Limited templates access
					</FeatureItem>
					<FeatureItem>
						<Icon status={ false }></Icon>
						Redirect after sign
					</FeatureItem>
					<FeatureItem>
						<Icon status={ false }></Icon>
						Hide Footer
					</FeatureItem>
					<FeatureItem>
						<Icon status={ false }></Icon>
						Hide Header
					</FeatureItem>
					<FeatureItem>
						<Icon status={ false }></Icon>
						Customize Emails
					</FeatureItem>
					<FeatureItem>
						<Icon status={ false }></Icon>
						Remove Branding
					</FeatureItem>
				</FeatureList>
				<PlanButton active={ true }>Current Plan</PlanButton>
			</Column>
			<Column>
				<ColumnHeader>
					<PackageName>Pro</PackageName>
					<PackagePrice>
						$6/month
						<BilledInfo>Billed yearly</BilledInfo>
					</PackagePrice>
					<PackageDescription>
						Level up your proposal game & get more proposal approved
						with useful features
					</PackageDescription>
				</ColumnHeader>
				<FeatureList>
					<FeatureTitle>
						Everything in the Free plan, plus
					</FeatureTitle>
					<FeatureItem>
						<Icon status={ true }></Icon>
						All templates access
					</FeatureItem>
					<FeatureItem>
						<Icon status={ true }></Icon>
						Redirect after sign
					</FeatureItem>
					<FeatureItem>
						<Icon status={ true }></Icon>
						Hide Footer
					</FeatureItem>
					<FeatureItem>
						<Icon status={ true }></Icon>
						Hide Header
					</FeatureItem>
					<FeatureItem>
						<Icon status={ true }></Icon>
						Customize Emails
					</FeatureItem>
					<FeatureItem>
						<Icon status={ true }></Icon>
						Instant Emails
					</FeatureItem>
					<FeatureItem>
						<Icon status={ true }></Icon>
						Remove Branding
					</FeatureItem>
				</FeatureList>
				<PlanButton active={ false }>Buy Pro</PlanButton>
			</Column>
		</TableRow>
	);
}
