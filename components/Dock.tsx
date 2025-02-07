'use client'
import React from 'react'
import { RiHome5Fill } from 'react-icons/ri'
import { BiSolidZap } from 'react-icons/bi'
import { BsPeopleFill } from 'react-icons/bs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const DockItems = [
    {
        icon: <RiHome5Fill />,
        link: '/',
    },
    {
        icon: <BiSolidZap />,
        link: '/tasks',
    },
    {
        icon: <BsPeopleFill />,
        link: '/frens',
    },
]

const Dock = () => {
    const pathname = usePathname()
    return (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-[#141414] rounded-full w-[50%]  overflow-hidden grid grid-cols-3 place-items-center">
            {
                DockItems.map((item, index) => (
                    <Link href={item.link} key={index} className={`p-2 px-6 rounded-full ${pathname === item.link ? 'bg-white/10 scale-[1.2]' : ''}`}>
                        {item.icon}
                    </Link>
                ))
            }
        </div>
    )
}

export default Dock