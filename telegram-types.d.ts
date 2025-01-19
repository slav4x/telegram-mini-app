// more info here https://core.telegram.org/bots/webapps#initializing-mini-apps
interface Window {
	Telegram: {
	  WebApp: {
    	requestFullscreen: () => void,
		disableVerticalSwipes: () => void,
		initData: string,
		initDataUnsafe: {
		  query_id: string,
		  user: {
			id: 699381957,
			first_name: string,
			last_name: string,
			username: string,
			language_code: string,
			is_premium: boolean,
			allows_write_to_pm: boolean
		  },
		  auth_date: number,
		  hash: string
		},
		version: string,
		platform: string,
		colorScheme: string,
		themeParams: any,
		isExpanded: boolean,
		viewportHeight: number,
		viewportStableHeight: number,
		isClosingConfirmationEnabled: boolean,
		BackButton: {
		  isVisible: boolean
		},
		MainButton: {
		  text: string,
		  color: string,
		  textColor: string,
		  isVisible: boolean,
		  isProgressVisible: boolean,
		  isActive: boolean
		},
		SettingsButton: {
		  isVisible: boolean
		},
		HapticFeedback: any,
		CloudStorage: any,
		BiometricManager: {
		  isInited: boolean,
		  isBiometricAvailable: boolean,
		  biometricType: string,
		  isAccessRequested: boolean,
		  isAccessGranted: boolean,
		  isBiometricTokenSaved: boolean,
		  deviceId: string
		},
		isVersionAtLeast: (version: string) => boolean,
		setHeaderColor: (color: string) => void,
		setBackgroundColor: (color: string) => void,
		enableClosingConfirmation: () => void,
		disableClosingConfirmation: () => void,
		onEvent: (eventType: any, eventHandler: any) => void,
		offEvent: (eventType: any, eventHandler: any) => void,
		sendData: (data: any) => void,
		switchInlineQuery: (query: string, choose_chat_types?: any) => void,
		openLink: (url: string, options?: any) => void,
		openTelegramLink: (url: string) => void,
		openInvoice: (url: string, callback?: any) => void,
		showPopup: (params: any, callback?: any) => void,
		showAlert: (message: any, callback?: any) => void,
		showConfirm: (message: any, callback?: any) => void,
		showScanQrPopup: (params: any, callback?: any) => void,
		closeScanQrPopup: () => void,
		readTextFromClipboard: (callback?: any) => void,
		requestWriteAccess: (callback?: any) => void,
		requestContact: (callback?: any) => void,
		ready: () => void,
		expand: () => void,
		close: () => void,
	  }
	},
  }