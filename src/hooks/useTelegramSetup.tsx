import { useEffect, useState } from 'react';

import { useTelegramFullscreen } from './useTelegramFullscreen';

export const useTelegramSetup = () => {
	const [isMobile, setIsMobile] = useState(false);

	useTelegramFullscreen();

	useEffect(() => {
		const tg = window.Telegram.WebApp;
		const platform = tg.platform;

		tg.ready();

		try {
			if (platform !== 'tdesktop' && platform !== 'macos' && tg.requestFullscreen !== undefined) {
				setIsMobile(true);
			}
		} catch (e) {
			console.error(e);
		}
	}, []);

	return { isMobile };
};
