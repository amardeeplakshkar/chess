'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UserData {
  id: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

interface TelegramContextType {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

export const TelegramProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initTelegramApp = async () => {
      try {
        if (typeof window !== "undefined") {
          const WebApp = (await import("@twa-dev/sdk")).default;
          WebApp.ready();

          const user = WebApp.initDataUnsafe?.user;
          if (user) {
            const userInfo: UserData = {
              id: user?.id?.toString() || "",
              firstName: user?.first_name || "",
              lastName: user?.last_name || "",
              username: user?.username || "",
            };

            setUserData(userInfo);
          } else {
            throw new Error("No user data available in initDataUnsafe.");
          }
        }
      } catch (err) {
        console.error("Error initializing Telegram WebApp:", err);
        setError("Failed to load Telegram user data.");
      } finally {
        setLoading(false);
      }
    };

    initTelegramApp();
  }, []);

  return (
    <TelegramContext.Provider value={{ userData, loading, error }}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error("useTelegram must be used within a TelegramProvider");
  }
  return context;
};