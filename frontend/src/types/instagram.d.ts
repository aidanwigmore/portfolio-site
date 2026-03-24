declare global {
  interface Window {
    instgrm?: {
      Embed: {
        process: () => void;
      };
    };
  }
}

export {};