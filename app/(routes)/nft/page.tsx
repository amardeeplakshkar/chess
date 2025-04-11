import NftComponent from '@/components/NftComponent'
import React from 'react'
import {
  Gem, Heart, Star, Moon, Sun, Zap, Feather, Cloud, Flame, Bolt
} from 'lucide-react'

const icons = [Gem, Heart, Star, Moon, Sun, Zap, Feather, Cloud, Flame, Bolt]
const colorPairs = [
    { fColor: '#B5FFFC', sColor: '#6A82FB' }, // light cyan → blurple
    { fColor: '#FDCB82', sColor: '#F55555' }, // orange cream → red
    { fColor: '#6DD5FA', sColor: '#2980B9' }, // light blue → dark blue
    { fColor: '#FF9A9E', sColor: '#F6416C' }  // soft pink → deep rose
  ]
  
  const nftData = Array.from({ length: 10 }).map((_, i) => ({
    icon: icons[i % icons.length],
    fColor: colorPairs[i % colorPairs.length].fColor,
    sColor: colorPairs[i % colorPairs.length].sColor
  }))  

const NftPage = () => {
  return (
    <div className="flex overflow-y-auto flex-wrap gap-4 justify-center">
      {nftData.map((item, idx) => (
        <NftComponent
          key={idx}
          icon={item.icon}
          fColor={item.fColor}
          sColor={item.sColor}
        />
      ))}
    </div>
  )
}

export default NftPage
