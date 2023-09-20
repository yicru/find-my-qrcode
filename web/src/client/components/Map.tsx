'use client'

import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useEffect, useRef } from 'react'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

type Props = {
  className?: string
}

export function Map({ className }: Props) {
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (map.current) return

    map.current = new mapboxgl.Map({
      attributionControl: false,
      center: [132.4594, 34.3853],
      container: 'map',
      hash: true,
      pitch: 60,
      style: 'mapbox://styles/mapbox/standard-beta',
      zoom: 15,
    })
  })

  return <div className={className} id={'map'} />
}
