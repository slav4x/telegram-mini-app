import { Outlet } from 'react-router';

import { Header, Navbar } from '@/components';
import { useUser } from '@/context/user.context';
import { useTelegramSetup } from '@/hooks/useTelegramSetup';

export const LayoutApp = () => {
	const { isMobile } = useTelegramSetup();
	const { loading, error } = useUser();

	if (loading) {
		return (
			<div className={isMobile ? 'main mobile' : 'main'}>
				<span className="loader"></span>
			</div>
		);
	}

	// if (error) {
	// 	return <div className={isMobile ? 'main mobile' : 'main'}>Error: {error}</div>;
	// }

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
