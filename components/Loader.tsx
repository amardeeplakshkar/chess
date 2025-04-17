'use client'

import React, { useState, useEffect } from 'react';
import { Loader2, LoaderIcon } from 'lucide-react';
import CheckpointIcon from './CheckpointIcon';
import { useClientReady } from './hooks/useClient';

const CountdownTimer = () => {
  const targetDate = new Date('May 25, 2025 00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex space-x-4 mt-4">
      <TimeUnit value={timeLeft.days} label="DAYS" />
      <TimeUnit value={timeLeft.hours} label="HOURS" />
      <TimeUnit value={timeLeft.minutes} label="MINS" />
      <TimeUnit value={timeLeft.seconds} label="SECS" />
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-xs tracking-widest text-gray-400">{label}</div>
    </div>
  );
};

const quotes = [
  "Check. Your. Calendar. The real match begins.",
  "Cosmic forces align. Prepare for launch.",
  "The wait is calculated. The impact is immeasurable.",
  "History will mark this date. Will you?",
  "Countdown to transcendence. Be ready.",
];

const Loader = () => {
  const [quote, setQuote] = useState(quotes[0]);
  const isClientReady = useClientReady();
  useEffect(() => {
    if (!isClientReady) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }, 1500);

    return () => clearInterval(interval);
  }, [isClientReady]);

  if (!isClientReady) {
    return <div className='flex justify-center items-center h-screen w-full bg-gradient-to-b from-black to-gray-900'>
      <LoaderIcon className='animate-spin text-white'/>
    </div>; 
  }

  return (
    <div className="flex justify-center items-center h-screen w-full bg-gradient-to-b from-black to-gray-900">
      <div className="relative w-full max-w-md flex flex-col items-center justify-center px-4 py-16">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white blur-3xl animate-pulse-subtle"></div>
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-gray-200 blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Main content */}
        <div className="z-10 flex flex-col items-center text-center">
          <CheckpointIcon className="text-white w-24 h-24 mb-6" />

          <h1 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 tracking-tight mb-2">
            $CHESS COUNTDOWN
          </h1>

          <div className="flex items-center justify-center my-2 w-full">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
            <span className="px-4 text-gray-400 text-sm tracking-widest">TGE ON MAY 25TH</span>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
          </div>

          <CountdownTimer />

          <p className="text-xs text-gray-300 my-6 max-w-xs animate-pulse-subtle">
            {quote}
          </p>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 blur-sm rounded-full"></div>
            <Loader2 className="h-10 w-10 text-white animate-spin relative" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
