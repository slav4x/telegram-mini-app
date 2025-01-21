import { useEffect, useState } from 'react';
import { TelegramService } from '@/services/telegram';

export const useTelegramSetup = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		TelegramService.init();
		TelegramService.expand();
		TelegramService.disableVerticalSwipes();

		const platform = TelegramService.getPlatform();
		if (platform !== 'tdesktop' && platform !== 'macos' && platform !== 'unknown' && platform !== 'web') {
			TelegramService.requestFullscreen();
			setIsMobile(true);
		}
	}, []);

	return { isMobile };
};
