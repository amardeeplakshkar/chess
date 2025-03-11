"use client"

import { useTelegram } from '@/components/providers/TelegramData';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselIndicator, CarouselItem, CarouselNavigation } from '@/components/ui/carousel';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import Aos from 'aos';
import 'aos/dist/aos.css';
import CheckpointIcon from '@/components/CheckpointIcon';
import { useRouter } from 'next/navigation';
import { useUser } from '@/components/providers/UserProvider';

const WelcomePage = () => {
    const { userData } = useTelegram()
    const [randomValue, setRandomValue] = React.useState(0);
    const {updateUser} = useUser()
    const router = useRouter()
    useEffect(() => {
        const value = Math.floor(Math.random() * (1200 - 500 + 1)) + 500;
        setRandomValue(value);
    }, []);

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    const handleWelcomePointsClaim = async () => {
        try {
            const response = await fetch('/api/claim-points', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    telegramId: userData?.userId,
                    points: randomValue + 527,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(`🎉 Points claimed!`);
                router.push("/")
                updateUser({
                    points: randomValue + 527,
                });
            } else {
                toast.error(data.error || 'Something went wrong.');
                router.push("/")
            }
        } catch (err) {
            console.error('Error claiming points:', err);
            toast.error('Failed to claim points.');
            router.push("/")
        }
    }
    return (
        <div>
            <Carousel className='relative z-50'>
                <CarouselIndicator className='flex justify-center items-center gap-2 absolute bottom-auto left-1/2 -translate-x-1/2 mb-4' />
                <CarouselContent>
                    <CarouselItem>
                        <div className='h-[100dvh] flex flex-col p-8'>
                            <h1 data-aos='fade-down' className='text-3xl font-bold'>TELEGRAM LEGACY ERA</h1>
                            <h2 data-aos='fade-down' data-aos-delay='500' className='text-2xl font-bold'>{Math.floor(Math.random() * (500 - 200 + 1)) + 200} DAYS</h2>
                            <p data-aos='fade-down' data-aos-delay='800' className='text-sm text-white/60'>
                                You&apos;re a devoted Telegram user!
                            </p>
                            <section data-aos='fade-down' data-aos-delay='1100' className='flex-1  flex justify-center items-center'>
                                <Avatar className='rouded-full w-[10rem] h-[10rem]'>
                                    <AvatarImage src='https://res.cloudinary.com/duscymcfc/image/upload/f_auto,q_auto/v1/Checkpoint/telegram' />
                                </Avatar>
                            </section>
                            <p className='text-sm text-white/60 text-center mb-[3.5rem]'>
                                Telegram&apos;s Global Users: 900M
                            </p>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className='h-[100dvh] flex flex-col p-8'>
                            <h1 data-aos='fade-down' className='text-3xl font-bold'>DOGS ERA</h1>
                            <h2 data-aos='fade-down' data-aos-delay='500' className='text-2xl font-bold'>The Real OGs!</h2>
                            <p data-aos='fade-down' data-aos-delay='800' className='text-sm text-white/60'>
                                You&apos;ve collected more dogs than 40% of users!
                            </p>
                            <section data-aos='fade-down' data-aos-delay='1100' className='flex-1  flex justify-center items-center'>
                                <Avatar className='rouded-full w-[10rem] h-[10rem]'>
                                    <AvatarImage src='https://res.cloudinary.com/duscymcfc/image/upload/f_auto,q_auto/v1/perks/dogs' />
                                </Avatar>
                            </section>
                            <p className='text-sm text-white/60 text-center mb-[3.5rem]'>
                                App&apos;s Users: 46M
                            </p>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className='h-[100dvh] flex flex-col p-8'>
                            <h1 data-aos='fade-down' className='text-3xl font-bold'>🐹 HAMSTER FRENZY</h1>
                            <h2 data-aos='fade-down' data-aos-delay='500' className='text-2xl font-bold'>Really?</h2>
                            <p data-aos='fade-down' data-aos-delay='800' className='text-sm text-white/60'>
                                Hope your fingers survived all that tapping!
                            </p>
                            <section data-aos='fade-down' data-aos-delay='1100' className='flex-1  flex justify-center items-center'>
                                <Avatar className='rouded-full w-[10rem] h-[10rem]'>
                                    <AvatarImage className='object-cover object-center' src='https://res.cloudinary.com/duscymcfc/image/upload/f_auto,q_auto/v1/checkpoint/hamster' />
                                </Avatar>
                            </section>
                            <p className='text-sm text-white/60 text-center mb-[3.5rem]'>
                                Hamster Kombat Players: 108M
                            </p>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className='h-[100dvh] flex flex-col p-8'>
                            <h1 data-aos='fade-down' className='text-3xl font-bold'>CHECKPOINT ERA</h1>
                            <h2 data-aos='fade-down' data-aos-delay='500' className='text-2xl font-bold'>Begins!</h2>
                            <p data-aos='fade-down' data-aos-delay='800' className='text-sm text-white/60'>
                                You&apos;re a active Telegram user!
                            </p>
                            <section data-aos='fade-down' data-aos-delay='1100' className='flex-1 flex flex-col gap-2 justify-center items-center'>
                            <CheckpointIcon height={150} width={150}/>
                            <p className='text-3xl font-bold text-center'>
                            {(randomValue+527).toLocaleString()} <span className='text-sm text-white/60'>
                                CPs
                            </span>
                            </p>
                        </section>
                        <p className='text-sm text-white/60 text-center mb-[3.5rem]'>
                            Let&apos;s the Journey Begin!
                        </p>
                    </div>
                </CarouselItem>
            </CarouselContent>
            <CarouselNavigation
                className='flex justify-center items-center gap-2 absolute top-auto bottom-0 left-1/2 -translate-x-1/2 mb-4'
                alwaysShow
                classNameButton='p-3 text-black dark:text-white'
                handleWelcomePointsClaim={handleWelcomePointsClaim}
            />
        </Carousel>
        </div >
    )
}

export default WelcomePage