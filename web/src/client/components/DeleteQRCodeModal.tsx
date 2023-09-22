import { Qrcode } from '.prisma/client'
import { client } from '@/client/lib/client'
import { Box, Button, Group, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ReactElement, useState } from 'react'
import { useSWRConfig } from 'swr'

type Props = {
  qrcode: Qrcode
  renderTrigger: (props: { onClick: () => void }) => ReactElement
}

export function DeleteQRCodeModal({ qrcode, renderTrigger }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [opened, { close, open }] = useDisclosure(false)

  const { mutate } = useSWRConfig()

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await client.api.qrcodes[':id'].$delete({
        param: {
          id: qrcode.id,
        },
      })
      await mutate('qrcodes')
      close()
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {renderTrigger({ onClick: open })}
      <Modal
        onClose={close}
        opened={opened}
        title={
          <Text className={'font-bold text-neutral-600'}>QRコードの削除</Text>
        }
      >
        <Box>
          <Text className={'text-sm font-medium'}>
            「{qrcode.name}」を削除しますか？
          </Text>
          <Group justify={'flex-end'} mt={'md'}>
            <Button disabled={isLoading} onClick={close} variant={'default'}>
              キャンセル
            </Button>
            <Button color={'red'} loading={isLoading} onClick={handleSubmit}>
              削除
            </Button>
          </Group>
        </Box>
      </Modal>
    </>
  )
}
