import React from 'react'
import { Loader2 } from 'lucide-react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[95dvh]">
      <Loader2 className="h-10 w-10 animate-spin text-white" />
    </div>
  )
}

export default Loader