import { useEffect, useState } from 'react';

export const useTelegramSetup = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const tg = window.Telegram.WebApp;
		const platform = tg.platform;

		tg.ready();

		try {
			tg.disableVerticalSwipes();

			if (platform !== 'tdesktop' && platform !== 'macos' && tg.requestFullscreen !== undefined) {
				tg.expand();
				tg.requestFullscreen();
				tg.setHeaderColor('#FFFFFF');

				setIsMobile(true);
			}
		} catch (e) {
			console.error(e);
		}
	}, []);

	return { isMobile };
};
