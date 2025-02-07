
import React from 'react'

const Button = ({children, className, onClick} : {children: React.ReactNode, className?: string, onClick?:React.MouseEventHandler<HTMLButtonElement>}) => {
  return (
    <button onClick={onClick} className={`cursor-pointer rounded-2xl inline-flex gap-1 justify-center items-center bg-[#141414] p-2 px-3 ${className}`}>
       {children}
    </button>
  )
}

export default Button