'use client'

import React, { useRef } from 'react'
import NftComponent from '@/components/NftComponent'
import {
  Gem, Heart, Star, Moon, Sun, Zap, Feather, Cloud, Flame, Bolt
} from 'lucide-react'
import html2canvas from 'html2canvas'

const icons = [Gem, Heart, Star, Moon, Sun, Zap, Feather, Cloud, Flame, Bolt]
const colorPairs = [
  { fColor: '#B5FFFC', sColor: '#6A82FB' },
  { fColor: '#FDCB82', sColor: '#F55555' },
  { fColor: '#6DD5FA', sColor: '#2980B9' },
  { fColor: '#FF9A9E', sColor: '#F6416C' }
]

const nftData = Array.from({ length: 10 }).map((_, i) => ({
  icon: icons[i % icons.length],
  fColor: colorPairs[i % colorPairs.length].fColor,
  sColor: colorPairs[i % colorPairs.length].sColor
}))

const NftPage = () => {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  const handleDownloadAll = async () => {
    for (let i = 0; i < refs.current.length; i++) {
      const ref = refs.current[i]
      if (!ref) continue

      const canvas = await html2canvas(ref, { backgroundColor: null })
      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `nft-${i + 1}.png`
      link.click()
    }
  }

  return (
    <div className="p-4">
      <button
        onClick={handleDownloadAll}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Download All NFTs
      </button>

      <div className="flex overflow-y-auto flex-wrap gap-4 justify-center">
        {nftData.map((item, idx) => (
          <div
            key={idx}
            ref={el => {
              refs.current[idx] = el
            }}
          >
            <NftComponent
              icon={item.icon}
              iColor={'transparent'}
              fColor={item.fColor}
              sColor={item.sColor}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default NftPage
