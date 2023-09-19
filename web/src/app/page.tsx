'use client'

import { CreateQRCodeModal } from '@/app/_components/CreateQRCodeModal'
import { Map } from '@/app/_components/Map'
import { AppShell, Burger, Button, Group, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export default function Home() {
  const [opened, { toggle }] = useDisclosure()
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ breakpoint: 'sm', collapsed: { mobile: !opened }, width: 300 }}
      padding={'md'}
    >
      <AppShell.Header>
        <Group h={'100%'} px={'md'}>
          <Burger
            hiddenFrom={'sm'}
            onClick={toggle}
            opened={opened}
            size={'sm'}
          />
          <Text className={'font-black text-gray-700'}>Find My QRCode</Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p={'md'}>
        <CreateQRCodeModal
          renderTrigger={(props) => <Button {...props}>QRコードを作成</Button>}
        />
      </AppShell.Navbar>
      <AppShell.Main p={0}>
        <Map className={'h-screen w-screen'} />
      </AppShell.Main>
    </AppShell>
  )
}
