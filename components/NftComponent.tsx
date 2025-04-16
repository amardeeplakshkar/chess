import { LucideProps } from 'lucide-react'
import React, { ForwardRefExoticComponent, RefAttributes } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

interface NftProps {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
  fColor: string,
  sColor: string,
  iColor: string
}

const NftComponent = ({ icon: Icon, fColor, sColor, iColor }: NftProps) => {
  const numIcons = 7
  const radius = 150
  const center = 160

  const iconSVG = renderToStaticMarkup(<Icon color={iColor} width={24} height={24} />)

  return (
    <div
      style={{
        backgroundImage: `radial-gradient(circle, ${fColor} 15%, ${sColor} 85%)`
      }}
      className="relative h-[20rem] w-[20rem] m-2"
    >
      {/* Outer ring */}
      {Array.from({ length: numIcons }).map((_, i) => {
        const angle = (2 * Math.PI / numIcons) * i
        const x = center + radius * Math.cos(angle) - 12
        const y = center + radius * Math.sin(angle) - 12

        return (
          <div
            key={`outer-${i}`}
            className="absolute"
            style={{ top: `${y}px`, left: `${x}px`, width: 24, height: 24 }}
            dangerouslySetInnerHTML={{ __html: iconSVG }}
          />
        )
      })}

      {/* Inner ring */}
      {Array.from({ length: numIcons }).map((_, i) => {
        const angle = (2 * Math.PI / numIcons) * i
        const x = center - 150 + radius - 85 * Math.cos(angle) - 12
        const y = center - 150 + radius - 85 * Math.sin(angle) - 12

        return (
          <div
            key={`inner-${i}`}
            className="absolute"
            style={{ top: `${y}px`, left: `${x}px`, width: 24, height: 24 }}
            dangerouslySetInnerHTML={{ __html: iconSVG }}
          />
        )
      })}
    </div>
  )
}

export default NftComponent
