import { useEffect, useState } from 'react';
import { TelegramService } from '@/services/telegram';

export const useTelegramSetup = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		TelegramService.init();
		TelegramService.expand();
		TelegramService.disableVerticalSwipes();

		const platform = TelegramService.getPlatform();
		if (platform === 'ios' || platform === 'android') {
			TelegramService.requestFullscreen();
			TelegramService.setHeaderColor('#FFFFFF');
			setIsMobile(true);
		}
	}, []);

	return { isMobile };
};
