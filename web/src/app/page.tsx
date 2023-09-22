'use client'

import { CreateQRCodeModal } from '@/client/components/CreateQRCodeModal'
import { Map } from '@/client/components/Map'
import { ShowQRCodeModal } from '@/client/components/ShowQRCodeModal'
import { client } from '@/client/lib/client'
import {
  AppShell,
  Burger,
  Button,
  Divider,
  Group,
  NavLink,
  Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import useSWR from 'swr'

export default function Home() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

  const { data } = useSWR('qrcodes', async () => {
    const result = await client.api.qrcodes.$get()
    return await result.json()
  })

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        breakpoint: 'sm',
        collapsed: { desktop: !desktopOpened, mobile: !mobileOpened },
        width: 300,
      }}
      padding={'md'}
    >
      <AppShell.Header>
        <Group h={'100%'} px={'md'}>
          <Burger
            hiddenFrom={'sm'}
            onClick={toggleMobile}
            opened={mobileOpened}
            size={'sm'}
          />
          <Burger
            onClick={toggleDesktop}
            opened={desktopOpened}
            size={'sm'}
            visibleFrom={'sm'}
          />
          <Text className={'font-black text-gray-700'}>Find My QRCode</Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p={'md'}>
        <CreateQRCodeModal
          renderTrigger={(props) => <Button {...props}>QRコードを作成</Button>}
        />
        <Divider my={'sm'} />
        {data?.data.map((qrcode) => (
          <ShowQRCodeModal
            key={qrcode.id}
            qrcode={qrcode}
            renderTrigger={(props) => (
              <NavLink
                className={'font-medium'}
                label={qrcode.name}
                leftSection={qrcode.emoji}
                {...props}
              />
            )}
          />
        ))}
      </AppShell.Navbar>
      <AppShell.Main p={0}>
        <Map className={'h-screen w-screen'} />
      </AppShell.Main>
    </AppShell>
  )
}
