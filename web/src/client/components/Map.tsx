'use client'

import { client } from '@/client/lib/client'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useEffect, useRef } from 'react'
import useSWR from 'swr'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

type Props = {
  className?: string
}

export function Map({ className }: Props) {
  const map = useRef<mapboxgl.Map | null>(null)

  const { data } = useSWR('find-locations', async () => {
    const result = await client.api['find-locations'].$get()
    return await result.json()
  })

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

  useEffect(() => {
    if (!data) return

    const markers = data.data.map((location) => {
      const el = document.createElement('div')
      el.style.height = '20px'
      el.style.width = '20px'
      el.style.borderRadius = '50%'
      el.style.backgroundColor = '#F00'

      return new mapboxgl.Marker(el)
        .setLngLat({
          lat: location.latitude,
          lng: location.longitude,
        })
        .addTo(map.current!)
    })

    return () => {
      markers.forEach((marker) => marker.remove())
    }
  }, [data])

  return <div className={className} id={'map'} />
}
