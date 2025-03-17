'use client'
import React from 'react'
import { RiHome5Fill, RiHome5Line } from 'react-icons/ri'
import { BiSolidZap } from 'react-icons/bi'
import { BsPeople, BsPeopleFill } from 'react-icons/bs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Zap } from 'lucide-react'
import { HiOutlineChartBar, HiChartBar } from "react-icons/hi";
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
    {
        icon: HiChartBar,
        icon2: HiOutlineChartBar,
        link: '/leaders',
    },
    {
        icon: BsPeopleFill,
        icon2: BsPeople,
        link: '/frens',
    },
]

const Dock = () => {
    const pathname = usePathname()
    return (
        <div className="absolute bottom-[1rem] left-1/2 transform -translate-x-1/2 bg-[#141414] rounded-full w-[50%]  overflow-hidden grid grid-cols-4 place-items-center">
            {
                DockItems.map((item, index) => (
                    <Link href={item.link} key={index} className={`p-3 px-6 scale-[1.2] rounded-full ${pathname === item.link ? 'bg-white/10' : ''}`}>
                        {
                            pathname === item.link ?
                                <item.icon />
                                :
                                <item.icon2 className='h-4 w-4' />
                        }
                    </Link>
                ))
            }
        </div>
    )
}

export default Dock
