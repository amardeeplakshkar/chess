'use client'
import React from 'react'
import Loader from '../Loader'
import { useTelegram } from './TelegramData'

const LoaderProvider = ({children}:{children:React.ReactNode}) => {
    const {userData} = useTelegram()
  return (
    <>
     {
                    userData ?
                        <>
                            {children}
                        </>
                        :
                        <Loader />
                }
    </>
  )
}

export default LoaderProvider