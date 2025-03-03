'use client'
import React from 'react'
import Loader from '../Loader'
import { useTelegram } from './TelegramData'

const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
    const { loading, userData, error } = useTelegram()

    if (loading) {
        return <Loader />
    }
    if (!userData) {
        return <div>Open in Telegram</div>
    }
    if (error) {
        return <div>{error}</div>
    }
    return (
        <>
            {children}
        </>
    )
}

export default LoaderProvider