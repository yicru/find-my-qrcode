'use client'

import { client } from '@/client/lib/client'
import ReactMapGl, { Marker } from 'react-map-gl'
import useSWR from 'swr'

type Props = {
  className?: string
}

export function Map({ className }: Props) {
  const { data } = useSWR('find-locations', async () => {
    const result = await client.api['find-locations'].$get()
    return await result.json()
  })

  return (
    <div className={className}>
      <ReactMapGl
        initialViewState={{
          latitude: 34.3853,
          longitude: 132.4594,
          zoom: 15,
        }}
        mapStyle={'mapbox://styles/mapbox/streets-v12'}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      >
        {data?.data.map((city, index) => (
          <Marker
            anchor={'bottom'}
            key={`marker-${index}`}
            latitude={city.latitude}
            longitude={city.longitude}
          >
            <svg
              className={'fill-red-600 stroke-0'}
              height={20}
              viewBox={'0 0 24 24'}
            >
              <path
                d={`M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`}
              />
            </svg>
          </Marker>
        ))}
      </ReactMapGl>
    </div>
  )
}
