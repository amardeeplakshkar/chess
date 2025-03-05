'use client'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState<string | null>();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [userId, setUserId] = useState('');
    const [startParam, setStartParam] = useState('');

    useEffect(() => {
        const initWebApp = async () => {
            if (typeof window !== 'undefined') {
                const WebApp = (await import('@twa-dev/sdk')).default;
                WebApp.ready();
                const userId = WebApp.initDataUnsafe.user?.id.toString() || '';
                const startParam = WebApp.initDataUnsafe.start_param || '';

                // Set the state
                setUserId(userId);
                setStartParam(startParam);

                checkReferral(); 
            }
        };

        initWebApp();
    }, []);

    const checkReferral = async () => {
        console.log("checkReferral function called"); // Check if it's called
        if (startParam && userId) {
            try {
                console.log("startParam:", startParam, "userId:", userId);
                // Save the referral first
                const referralResponse = await fetch('/api/referrals', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId, referrerId: startParam }),
                });

                if (!referralResponse.ok) throw new Error('Failed to save referral');

                // Add points to the referrer
                const pointsResponse = await fetch('/api/add-points', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: startParam, points: 752 }), // Points to be added
                });

                if (!pointsResponse.ok) throw new Error('Failed to add points');

                console.log('Points added successfully');
            } catch (error) {
                console.error('Error during referral:', error);
            }
        }
    };


    // Fetch and initialize user data
    useEffect(() => {
        const fetchUserData = async () => {
            if (typeof window !== "undefined" && window.Telegram?.WebApp) {
                const tg = window.Telegram.WebApp;
                tg.ready();

                const initDataUnsafe = tg.initDataUnsafe || {};

                if (initDataUnsafe.user) {
                    try {
                        const response = await fetch("/api/user", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(initDataUnsafe.user),
                        });

                        const data = await response.json();

                        if (response.ok) {
                            setUser(data || {});
                        } else {
                            throw new Error(data.error || "Failed to fetch user data");
                        }
                    } catch (err) {
                        const errorMsg = "Failed to fetch user data: " + err;
                        setError(`Failed to fetch user data: + err`);
                        toast.error(errorMsg); // Show toast for fetch error
                        if (err === "Internal server error") {
                            tg.close(); // Close the mini app on internal server error
                        }
                    } finally {
                        setLoading(false);
                        checkReferral(); // Check referral after fetching user data
                    }
                } else {
                    const noUserError = "No user data available";
                    setError(noUserError);
                    toast.error(noUserError); // Show toast for no user data
                    setUser(null);
                    setLoading(false);
                }
            } else {
                const appError = "This app should be opened in Telegram";
                setError(appError);
                toast.error(appError); // Show toast for app error
                setLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className="flex justify-center p-4 mx-auto text-red-500">{error}</div>;
    }
    return (
        <div>
            <pre>
                {user}
            </pre>
            {children}
        </div>
    )
}

export default LoaderProvider