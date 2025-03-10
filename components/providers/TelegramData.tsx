/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Loader from "../Loader";

interface UserData {
  userId: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  isPremium?: boolean;
  photoUrl?: string;
}

interface TelegramContextType {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  WebApp: any | null;
  startParam: string | null;
}

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

export const TelegramProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [WebApp, setWebApp] = useState<any | null>(null);
  const [startParam, setStartParam] = useState<string | null>(null);

  useEffect(() => {
    const initTelegramApp = async () => {
      try {
        if (typeof window !== "undefined") {
          const importedWebApp = (await import("@twa-dev/sdk")).default;
          importedWebApp.ready();
          const startParam = importedWebApp.initDataUnsafe?.start_param || null;
          setStartParam(startParam);
          setWebApp(importedWebApp);

          const user = importedWebApp.initDataUnsafe?.user;
          if (user) {
            const userInfo: UserData = {
              userId: user?.id || 0,
              firstName: user?.first_name || "",
              lastName: user?.last_name || "",
              username: user?.username || "",
              isPremium: user?.is_premium || false,
              photoUrl: user?.photo_url || "",
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
    }
    initTelegramApp();
  }, []);
  
  if(loading) {
    return <Loader/>;
  }
  return (
    <TelegramContext.Provider value={{ userData, loading, error, WebApp, startParam }}>
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
