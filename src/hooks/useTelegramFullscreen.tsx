import { useEffect } from 'react';
import { TelegramService } from '@/services/telegram';

export const useTelegramFullscreen = () => {
	useEffect(() => {
		TelegramService.init();
		TelegramService.expand();
		TelegramService.disableVerticalSwipes();

		const platform = TelegramService.getPlatform();
		if (platform !== 'tdesktop' && platform !== 'macos' && platform !== 'unknown') {
			TelegramService.requestFullscreen();
			TelegramService.setHeaderColor('#FFFFFF');
		}
	}, []);
};
