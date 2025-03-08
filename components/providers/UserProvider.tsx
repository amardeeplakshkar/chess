/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTelegram } from './TelegramData';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
interface UserContextType {
  user: any;
  loading: boolean;
  error: string | null;
  startParam: string;
  updateUser: (updates: Partial<{ points: number; completedTaskIds: string[] }>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userData, WebApp } = useTelegram();
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [startParam, setStartParam] = useState('');
  const router = useRouter();

  const updateUser = (updates: Partial<{ points: number; completedTaskIds: string[] }>) => {
    setUser((prevUser: { points: number; completedTaskIds: string[]; }) => ({
      ...prevUser!,
      ...updates,
      points: (prevUser?.points || 0) + (updates.points || 0),
      completedTaskIds: [...(prevUser?.completedTaskIds || []), ...(updates.completedTaskIds || [])],
    }));}

    useEffect(() => {
      if (WebApp) {
        const startParam = WebApp.initDataUnsafe?.start_param || '';
        setStartParam(startParam);
      }
    }, [WebApp]);

    useEffect(() => {
      const fetchUserData = async () => {
        if (!userData) {
          setError("No user data available");
          toast.error("No user data available");
          setLoading(false);
          return;
        }

        WebApp.ready?.();

        try {
          const response = await fetch("/api/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Failed to fetch user data");
          }

          setUser(data || {});

          // if (!data.hasClaimedWelcomePoints) {
          //   router.push("/welcome");
          // }
        } catch (err: any) {
          const errorMsg = "Failed to fetch user data: " + err.message;
          setError(errorMsg);
          toast.error(errorMsg);
          if (err.message === "Internal server error") {
            WebApp.close?.();
          }
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }, [router, WebApp, userData]);

    if (loading) return <>Loading</>;
    if (error) return <div className="flex justify-center p-4 mx-auto text-red-500">{error}</div>;

    return (
      <UserContext.Provider value={{ user, loading, error, startParam, updateUser }}>
        {children}
      </UserContext.Provider>
    );
  };
  export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useUser must be used within a UserProvider");
    }
    return context;
  };

  export default UserProvider;