'use client'

import { QRCode } from '.prisma/client'
import { CreateQRCodeModal } from '@/app/_components/CreateQRCodeModal'
import { Map } from '@/app/_components/Map'
import { Database } from '@/app/_types/supabase'
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
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

export default function Home() {
  const [opened, { toggle }] = useDisclosure()

  const [qrcodes, setQRCodes] = useState<
    Omit<QRCode, 'createdAt' | 'updatedAt'>[]
  >([])

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClientComponentClient<Database>()
      const { data } = await supabase.from('qrcodes').select()

      if (data) {
        setQRCodes(data)
      }
    }

    fetch()
  }, [])

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
        <Divider my={'sm'} />
        {qrcodes.map((qrcode) => (
          <NavLink
            className={'font-medium'}
            key={qrcode.id}
            label={qrcode.name}
          />
        ))}
      </AppShell.Navbar>
      <AppShell.Main p={0}>
        <Map className={'h-screen w-screen'} />
      </AppShell.Main>
    </AppShell>
  )
}
