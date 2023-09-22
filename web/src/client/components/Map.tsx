'use client'

import { client } from '@/client/lib/client'
import { HoverCard, Text } from '@mantine/core'
import { format } from 'date-fns'
import 'mapbox-gl/dist/mapbox-gl.css'
import ReactMapGl, {
  GeolocateControl,
  Marker,
  NavigationControl,
  useMap,
} from 'react-map-gl'
import useSWR from 'swr'

type Props = {
  className?: string
}

export function Map({ className }: Props) {
  const { current: map } = useMap()

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
        mapStyle={'mapbox://styles/mapbox/light-v11'}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      >
        <NavigationControl />
        <GeolocateControl
          onGeolocate={(e) => {
            map?.flyTo({
              center: [e.coords.longitude, e.coords.latitude],
              zoom: 15,
            })
          }}
        />

        {data?.data.map((location, index) => (
          <Marker
            anchor={'bottom'}
            key={`marker-${index}`}
            latitude={location.latitude}
            longitude={location.longitude}
          >
            <HoverCard shadow={'md'} width={280}>
              <HoverCard.Target>
                <svg
                  className={'fill-[#228BE6]'}
                  fill={'none'}
                  height={'24'}
                  stroke={'white'}
                  strokeLinecap={'round'}
                  strokeLinejoin={'round'}
                  strokeWidth={'2'}
                  viewBox={'0 0 24 24'}
                  width={'24'}
                  xmlns={'http://www.w3.org/2000/svg'}
                >
                  <path d={'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z'} />
                  <circle cx={'12'} cy={'10'} r={'3'} />
                </svg>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Text className={'text-xs font-medium'}>
                  {location.qrcode.emoji && (
                    <span className={'mr-2'}>{location.qrcode.emoji}</span>
                  )}
                  <span>{location.qrcode.name}</span>
                </Text>
                <Text className={'mt-4 text-xs font-medium text-neutral-600'}>
                  見つかった日時：
                  {format(
                    new Date(location.createdAt.toString()),
                    'yyyy/MM/dd HH:mm:ss',
                  )}
                </Text>
              </HoverCard.Dropdown>
            </HoverCard>
          </Marker>
        ))}
      </ReactMapGl>
    </div>
  )
}
