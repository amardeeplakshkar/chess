// telegram.d.ts
interface Window {
    Telegram?: {
      WebApp: {
        close(): unknown;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name: string;
            username: string;
            language_code: string;
          };
          start_param?: string;
        };
        ready(): unknown;
        openLink: (url: string) => void;
      };
    };
  }