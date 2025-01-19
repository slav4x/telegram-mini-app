import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import { Header, Navbar } from '../../components';

export const LayoutApp = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const tg = window.Telegram.WebApp;
		const platform = tg.platform;

		const themeParams = tg?.themeParams;

		console.log(themeParams);

		tg.ready();

		try {
			tg.disableVerticalSwipes();

			if (platform !== 'tdesktop' && platform !== 'macos' && tg.requestFullscreen !== undefined) {
				tg.expand();
				tg.requestFullscreen();

				document.documentElement.style.setProperty('--tg-color-scheme', 'light');
				document.documentElement.style.setProperty('--tg-theme-bg-color', '#ffffff');
				document.documentElement.style.setProperty('--tg-theme-text-color', '#000000');

				tg.setHeaderColor('#FFFFFF');

				setIsMobile(true);
			}
		} catch (e) {
			console.error(e);
		}
	}, []);

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
