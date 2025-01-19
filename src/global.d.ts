export {};

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: any;
        close: () => void;
        expand: () => void;
        ready: () => void;
        themeParams: {
          [key: string]: string | undefined;
        };
        // Добавь любые другие методы, если используешь
      };
    };
  }
}
