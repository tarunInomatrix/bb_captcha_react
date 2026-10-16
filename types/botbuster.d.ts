declare global {
  interface Window {
    onBotbusterSuccess?: () => void;
    initBotbusterSDK?: (email: string, options: unknown, flag: boolean) => void;
  }
}

export {};
