'use client'
import React, { useEffect, useState } from 'react'
import { useTelegram } from './TelegramData'
import Loader from '../Loader'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
    const { userData, WebApp } = useTelegram()
    const [user, setUser] = useState(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [startParam, setStartParam] = useState('');
    const router = useRouter()

    useEffect(() => {
        const initWebApp = async () => {
            try {
                if (WebApp) {
                    const startParam = WebApp.initDataUnsafe?.start_param || '';
                    setStartParam(startParam);
                }
            } catch (error) {
                console.error("Failed to initialize Telegram Web App SDK:", error);
                toast.error("Failed to initialize Telegram Web App.");
            } finally {
            }
        };

        initWebApp();
    }, [WebApp]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (WebApp && userData) 
                WebApp.ready?.();
                if (userData) {
                    try {
                        const response = await fetch("/api/user", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(userData),
                        });

                        const data = await response.json();

                        if (response.ok) {
                            setUser(data || {});
                            if (!data.hasClaimedWelcomePoints) {
                                router.push("/welcome");
                            }
                        } else {
                            throw new Error(data.error || "Failed to fetch user data");
                        }
                    } catch (err) {
                        const errorMsg = "Failed to fetch user dataa: " + err;
                        setError(errorMsg);
                        toast.error(errorMsg);
                        if (err === "Internal server error") {
                            WebApp.close?.()
                        }
                    } finally {
                        setLoading(false);
                    }
                } else {
                    const noUserError = "No user data available";
                    setError(noUserError);
                    toast.error(noUserError);
                    setUser(null);
                    setLoading(false);
                }
            }
        fetchUserData();
    }, [router, WebApp, userData]);

    if (loading) return <Loader />;
    if (error) {
        return <div className="flex justify-center p-4 mx-auto text-red-500">{error}</div>;
    }
    return (
        <div>
            <pre>
                {user ? JSON.stringify(userData, null, 2) : null}
                {startParam ? JSON.stringify(startParam, null, 2) : null}
            </pre>
            {children}
        </div>
    )
}

export default LoaderProvider