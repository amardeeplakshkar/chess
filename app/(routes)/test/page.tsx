'use client'

import { useTelegram } from "@/components/providers/TelegramData";


export default function UserProfile() {
  const { userData, loading, error } = useTelegram();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 m-4 bg-gray-800 text-white rounded-lg">
      {userData ? (
        <>
          <h2 className="text-lg font-bold">Welcome, {userData.firstName}!</h2>
          {userData.username && <p className="text-sm">@{userData.username}</p>}
        </>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}