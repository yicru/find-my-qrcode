'use client'

import { CreateQRCodeModal } from '@/client/components/CreateQRCodeModal'
import { Map } from '@/client/components/Map'
import { ShowQRCodeModal } from '@/client/components/ShowQRCodeModal'
import { client } from '@/client/lib/client'
import { Box, Button, Group, Table, Text } from '@mantine/core'
import useSWR from 'swr'

export default function Home() {
  const { data, isLoading } = useSWR('qrcodes', async () => {
    const result = await client.api.qrcodes.$get()
    return await result.json()
  })

  return (
    <Box className={'px-6 py-4'}>
      <Box className={'mx-auto w-full max-w-4xl'}>
        <Text className={'font-black text-neutral-700'}>Find My QRCode</Text>
      </Box>

      <Box className={'w-full'}>
        <Map
          className={
            'mt-4 h-96 w-full overflow-hidden rounded-lg bg-neutral-200'
          }
        />
      </Box>

      <Box className={'mx-auto mt-10 w-full max-w-4xl'}>
        <Group className={'justify-between px-2'}>
          <Text className={'font-bold text-neutral-700'}>QRコード一覧</Text>
          <CreateQRCodeModal
            renderTrigger={(props) => <Button {...props}>コードを追加</Button>}
          />
        </Group>

        <Table className={'mt-4'}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th className={'text-xs font-medium text-neutral-600'}>
                なまえ
              </Table.Th>
              <Table.Th className={'text-right'} />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {isLoading && (
              <Table.Tr>
                <Table.Td className={'text-xs font-medium'}>
                  読み込み中...
                </Table.Td>
              </Table.Tr>
            )}
            {!isLoading && data?.data.length === 0 && (
              <Table.Tr>
                <Table.Td className={'text-xs font-medium'}>
                  登録済みのQRコードがありません
                </Table.Td>
              </Table.Tr>
            )}
            {data?.data.map((qrcode) => (
              <Table.Tr key={qrcode.id}>
                <Table.Td>
                  {qrcode.emoji && (
                    <span className={'mr-2'}>{qrcode.emoji}</span>
                  )}
                  <span className={'font-medium'}>{qrcode.name}</span>
                </Table.Td>
                <Table.Td className={'text-right'}>
                  <ShowQRCodeModal
                    qrcode={qrcode}
                    renderTrigger={(props) => (
                      <Button size={'xs'} variant={'light'} {...props}>
                        QRコードを表示
                      </Button>
                    )}
                  />
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Box>
    </Box>
  )
}
