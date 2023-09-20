'use client'

import { client } from '@/client/lib/client'
import { Button, Center, Text } from '@mantine/core'

export default function Find({ params }: { params: { pid: string } }) {
  const onClickShare = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await client.api.qrcodes[':id'].find.$post({
          json: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          param: { id: params.pid },
        })

        alert('位置情報を共有しました')
      },
      () => {
        alert('位置情報の取得に失敗しました')
      },
    )
  }

  return (
    <Center className={'h-full w-full bg-neutral-100'}>
      <Center
        className={
          'h-full w-full max-w-md flex-col items-start space-y-10 bg-white p-8'
        }
      >
        <Text className={'font-bold'}>
          紛失したアイテムを見つけていただき
          <br />
          ありがとうございます！
        </Text>
        <Button className={'w-full'} onClick={onClickShare}>
          現在地を持ち主に共有
        </Button>
      </Center>
    </Center>
  )
}
