'use client'
import React, {  } from 'react'
import { useTelegram } from './TelegramData'
import Loader from '../Loader'

const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
    const {loading, error, userData} =  useTelegram()
    if (loading) {
        return <Loader/>;
    }
    if (error) {
        return <div className="flex justify-center p-4 mx-auto text-red-500">{error}</div>;
    }
    return (
        <div>
            <pre>
            {userData ? JSON.stringify(userData, null, 2) : null}
            </pre>
            {children}
        </div>
    )
}

export default LoaderProvider