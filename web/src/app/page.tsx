'use client'

import { QRCode } from '.prisma/client'
import { CreateQRCodeModal } from '@/client/components/CreateQRCodeModal'
import { Map } from '@/client/components/Map'
import { ShowQRCodeModal } from '@/client/components/ShowQRCodeModal'
import { Database } from '@/shared/types/supabase'
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
  const [qrcodes, setQRCodes] = useState<QRCode[]>([])

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClientComponentClient<Database>()
      const { data } = await supabase.from('qrcodes').select()

      if (data) {
        setQRCodes(
          data.map((qrcode) => ({
            ...qrcode,
            createdAt: new Date(qrcode.created_at),
            updatedAt: new Date(qrcode.updated_at),
          })),
        )
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
          <ShowQRCodeModal
            key={qrcode.id}
            qrcode={qrcode}
            renderTrigger={(props) => (
              <NavLink
                className={'font-medium'}
                label={qrcode.name}
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
