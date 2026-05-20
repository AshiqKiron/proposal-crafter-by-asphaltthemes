/**
 * External dependencies
 */
import { compose } from '@wordpress/compose';
import { Outlet, NavLink } from 'react-router-dom';
/**
 * Internal dependencies
 */
import { withPageWrapper } from '@dashboard/higher-order';
import { useWrapperPosition } from '@dashboard/hooks';
import {
	Wrapper,
	Header,
	HeaderContent,
	Heading,
	Paragraph,
	SubMenu,
	SubMenuItem,
} from './style';

function Settings() {
	const { wrapperRef, position } = useWrapperPosition();

	return (
		<Wrapper ref={wrapperRef} style={position}>
			<Header>
				<HeaderContent>
					<Heading>Settings</Heading>
					<Paragraph>
						Customize your preferences to quickly create
						professional proposals. Tailor templates and manage
						workflows for efficiency
					</Paragraph>
				</HeaderContent>
			</Header>
			<SubMenu>
				<SubMenuItem as={NavLink} to="sender">
					Sender
				</SubMenuItem>
				{/* <SubMenuItem as={ NavLink } to="email">
					Email
				</SubMenuItem> */}
				<SubMenuItem as={NavLink} to="template">
					Template
				</SubMenuItem>
				{/* <SubMenuItem as={ NavLink } to="license">
					Licensing
				</SubMenuItem> */}
			</SubMenu>
			<Outlet />
		</Wrapper>
	);
}

export default compose(
	withPageWrapper({
		title: 'Settings',
	})
)(Settings);
