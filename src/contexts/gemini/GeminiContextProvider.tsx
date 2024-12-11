import { FC, useCallback } from 'react';
import { send } from '../../config/gemini';
import { GeminiContext } from './GeminiContext';

interface GeminiContextProviderProps {
  children: React.ReactNode;
}

export const GeminiContextProvider: FC<GeminiContextProviderProps> = ({
  children,
}) => {
  const sendMessage = useCallback(async (prompt: string) => {
    const result = await send(prompt);
    return result;
  }, []);

  return (
    <GeminiContext.Provider
      value={{
        sendMessage,
      }}
    >
      {children}
    </GeminiContext.Provider>
  );
};
