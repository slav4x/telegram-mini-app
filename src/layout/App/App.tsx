import { Outlet } from 'react-router';

import { Header, Navbar } from '@/components';
import { useTelegramSetup } from '@/hooks/useTelegramSetup';

export const LayoutApp = () => {
	const { isMobile } = useTelegramSetup();

	return (
		<div className={isMobile ? 'main mobile' : 'main'}>
			<Header />
			<div className="content">
				<Outlet />
			</div>
			<Navbar />
		</div>
	);
};
