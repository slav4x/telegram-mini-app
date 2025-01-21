import { useEffect } from 'react';

export const useTelegramFullscreen = () => {
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
			}
		} catch (e) {
			console.error('Error enabling fullscreen mode:', e);
		}
	}, []);
};
