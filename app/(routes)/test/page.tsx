'use client'
import { useTelegram } from '@/components/providers/TelegramData';
import React from 'react';

const TestPage = () => {
  const { WebApp } = useTelegram();

  return (
    <div>
      <h1>Telegram WebApp Info</h1>
      <pre>{JSON.stringify(WebApp, null, 2)}</pre>
    </div>
  );
};

export default TestPage;
