"use client"

import { motion } from "framer-motion"
import React from 'react';

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 2 * position} -${89 + i * 6}C-${
      380 - i * 2 * position
    } -${89 + i * 6} -${312 - i * 2 * position} ${116 - i * 6} ${
      152 - i * 2 * position
    } ${243 - i * 6}C${616 - i * 2 * position} ${370 - i * 6} ${
      684 - i * 2 * position
    } ${775 - i * 6} ${684 - i * 2 * position} ${775 - i * 6}`,
    width: 0.5 + i * 0.03,
    color: `hsl(261, 55%, ${10 + i * 0.57}%)`,
    opacity: 0.1 + i * 0.015
  }))

  return (
    <div className="pointer-events-none overflow-hidden w-full h-full">
      <svg className="w-full h-full" viewBox="0 0 696 875" fill="none" preserveAspectRatio="xMidYMid slice">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={path.color}
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.3, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [0, path.opacity * 0.6, 0],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 30 + Math.random() * 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function BackgroundPaths() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  )
} 