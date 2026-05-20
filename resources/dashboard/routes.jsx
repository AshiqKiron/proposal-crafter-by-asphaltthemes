import {
	createRoutesFromElements,
	Route,
	Navigate,
	createHashRouter,
} from 'react-router-dom';
/**
 * Internal dependencies
 */
import DashboardLayout from './layouts/dashboard';
import Overview from './overview';
import Proposals from './proposals';
import Templates from './templates';
import Settings from './settings';
import Sender from './settings/sender';
import Email from './settings/email';
import Template from './settings/template';
import SettingsLicense from './settings/license';
import License from './license';

const router = createHashRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<DashboardLayout />}>
				<Route path="/" element={<Navigate to="overview" />} />
				<Route path="overview" element={<Overview />} />
				<Route path="proposals" element={<Proposals />} />
				<Route path="templates" element={<Templates />} />
				<Route path="settings" element={<Settings />}>
					<Route path="" element={<Navigate to="sender" />} />
					<Route path="sender" element={<Sender />} />
					<Route path="email" element={<Email />} />
					<Route path="template" element={<Template />} />
					<Route path="license" element={<SettingsLicense />} />
				</Route>
				<Route path="license" element={<License />} />
				<Route path="*" element={<Navigate to="overview" />} />
			</Route>
		</>
	)
);

export default router;
