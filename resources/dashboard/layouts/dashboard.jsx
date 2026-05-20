/**
 * External dependencies
 */
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Toaster } from 'react-hot-toast';

/**
 * Internal dependencies
 */
import { THEME } from '@dashboard/constants';
import { CreateProposalModal } from '@dashboard/components';

export default function Dashboard() {
	return (
		<ThemeProvider theme={THEME}>
			<Toaster
				position="top-center"
				containerStyle={{
					top: 50,
				}}
			/>
			<Outlet />
			<CreateProposalModal />
		</ThemeProvider>
	);
}
