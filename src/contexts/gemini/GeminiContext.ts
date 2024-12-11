import { createContext } from 'react';

type GeminiContextValue = {
  sendMessage: (prompt: string) => Promise<string>;
};

export const GeminiContext = createContext<GeminiContextValue>(
  {} as GeminiContextValue
);
