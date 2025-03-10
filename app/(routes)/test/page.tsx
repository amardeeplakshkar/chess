'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTelegram } from '@/components/providers/TelegramData';
import React from 'react';

const TestPage = () => {
  const { WebApp } = useTelegram();

  function shareStory(mediaUrl: string, text = "", widgetLink?: { url: string; name?: string }) {
    if (WebApp) {
      const params: Record<string, any> = {};

      if (text) {
        params.text = text;
      }

      if (widgetLink && widgetLink.url) {
        params.widget_link = {
          url: widgetLink.url,
          ...(widgetLink.name && { name: widgetLink.name }),
        };
      }

      WebApp.shareToStory(mediaUrl, params);
    } else {
      console.error("Telegram WebApp SDK not available.");
    }
  }
  return <div onClick={()=> shareStory(
    "https://core.telegram.org/file/464001388/10b1a/IYpn0wWfggw.1156850/fd9a32baa81dcecbe4", 
    "Check out this awesome story!", 
    { url: "https://t.me/checkpointcryptobot/start", name: "Visit Now" }
  )}>TestPage</div>;
};

export default TestPage;
