'use client'
import React from 'react'
import { RiHome5Fill, RiHome5Line } from 'react-icons/ri'
import { BiSolidZap } from 'react-icons/bi'
import { BsPeople, BsPeopleFill } from 'react-icons/bs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Zap } from 'lucide-react'
// import { HiOutlineChartBar, HiChartBar } from "react-icons/hi";
// import CheckpointIcon from './CheckpointIcon'
const DockItems = [
    {
        icon: RiHome5Fill,
        icon2: RiHome5Line,
        link: '/',
    },
    {
        icon: BiSolidZap,
        icon2: Zap,
        link: '/tasks',
    },
    // {
    //     icon: CheckpointIcon,
    //     icon2: CheckpointIcon,
    //     link: '/tge',
    // },
    // {
    //     icon: HiChartBar,
    //     icon2: HiOutlineChartBar,
    //     link: '/leaders',
    // },
    {
        icon: BsPeopleFill,
        icon2: BsPeople,
        link: '/frens',
    },
]

const Dock = () => {
    const pathname = usePathname()
    return (
        <>
            {
                pathname === '/welcome' ? null :
                <footer className='flex  justify-center items-center -mt-[2.5rem] mb-2'>
                <div className={`grid overflow-hidden rounded-full grid-cols-3 bg-[#111111] w-[60dvw]`}>
                    {
                        DockItems.map((item, index) => (
                            <Link href={item.link} key={index} className={`grid place-items-center p-3 px-6 rounded-full ${pathname === item.link ? 'bg-white/10' : ''}`}>
                                {
                                    pathname === item.link ?
                                        <item.icon height={16} className='self-center' />
                                        :
                                        <item.icon2 className='h-4 w-4 self-center' />
                                }
                            </Link>
                        ))
                    }
                </div>
            </footer>}
        </>
    )
}

export default Dock
