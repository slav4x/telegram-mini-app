import { useEffect, useState } from 'react';

export const useTelegramSetup = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const tg = window.Telegram.WebApp;

		tg.ready();

		try {
			tg.expand();
			tg.disableVerticalSwipes();

			const platform = tg.platform;

			if (platform !== 'tdesktop' && platform !== 'macos' && tg.requestFullscreen !== undefined) {
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
