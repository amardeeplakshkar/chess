import React from 'react'
import { jelly } from 'ldrs'

jelly.register()

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-[95dvh]">
      <l-jelly
        size="40"
        speed="0.9"
        color="white"
      ></l-jelly>
    </div>
  )
}

export default Loader