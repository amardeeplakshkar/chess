import { LucideProps } from 'lucide-react'
import React, { ForwardRefExoticComponent, RefAttributes } from 'react'

interface NftProps {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
  fColor: string,
  sColor: string,
}

const NftComponent = ({ icon: Icon, fColor, sColor }: NftProps) => {
  const numIcons = 7
  const radius = 150
  const center = 160

  return (
    <div
      style={{
        backgroundImage: `radial-gradient(circle, ${fColor} 15%, ${sColor} 85%)`
      }}
      className="relative h-[20rem] w-[20rem] m-2"
    >
      {Array.from({ length: numIcons }).map((_, i) => {
        const angle = (2 * Math.PI / numIcons) * i
        const x = center + radius * Math.cos(angle) - 12
        const y = center + radius * Math.sin(angle) - 12

        return (
          <Icon
            key={`outer-${i}`}
            className="absolute w-6 h-6"
            style={{ top: `${y}px`, left: `${x}px`, color: sColor, position: 'absolute' }}
          />
        )
      })}

      {Array.from({ length: numIcons }).map((_, i) => {
        const angle = (2 * Math.PI / numIcons) * i
        const x = center - 150 + radius - 85 * Math.cos(angle) - 12
        const y = center - 150 + radius - 85 * Math.sin(angle) - 12

        return (
          <Icon
            key={`inner-${i}`}
            className="absolute w-6 h-6"
            style={{ top: `${y}px`, left: `${x}px`, color: sColor, position: 'absolute' }}
          />
        )
      })}
    </div>
  )
}

export default NftComponent
