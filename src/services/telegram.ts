export const TelegramService = {
	getWebApp: () => window.Telegram.WebApp,
	init: () => {
		const tg = window.Telegram.WebApp;
		tg.ready();
		return tg;
	},
	expand: () => {
		const tg = window.Telegram.WebApp;
		tg.expand();
	},
	requestFullscreen: () => {
		const tg = window.Telegram.WebApp;
		if (tg.requestFullscreen) {
			tg.requestFullscreen();
		}
	},
	disableVerticalSwipes: () => {
		const tg = window.Telegram.WebApp;
		tg.disableVerticalSwipes();
	},
	setHeaderColor: (color: string) => {
		const tg = window.Telegram.WebApp;
		tg.setHeaderColor(color);
	},
	setBackgroundColor: (color: string) => {
		const tg = window.Telegram.WebApp;
		tg.setBackgroundColor(color);
	},
	getPlatform: () => {
		const tg = window.Telegram.WebApp;
		return tg.platform;
	},
	getUserData: () => {
		const tg = window.Telegram.WebApp;
		return tg.initDataUnsafe.user;
	},
	close: () => {
		const tg = window.Telegram.WebApp;
		tg.close();
	}
};
