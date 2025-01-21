import { useEffect, useState } from 'react';

import { useTelegramFullscreen } from './useTelegramFullscreen';

export const useTelegramSetup = () => {
	const [isMobile, setIsMobile] = useState(false);

	useTelegramFullscreen();

	useEffect(() => {
		const tg = window.Telegram.WebApp;
		const platform = tg.platform;

		tg.ready();

		console.log(tg.requestFullscreen);

		try {
			if (platform !== 'tdesktop' && platform !== 'macos' && platform !== 'unknown') {
				setIsMobile(true);
			}
		} catch (e) {
			console.error(e);
		}
	}, []);

	return { isMobile };
};
