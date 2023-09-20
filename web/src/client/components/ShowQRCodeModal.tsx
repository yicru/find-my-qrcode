import { Qrcode } from '.prisma/client'
import { Button, Center, Group, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ReactElement } from 'react'
import ReactQRCode from 'react-qr-code'

type Props = {
  qrcode: Qrcode
  renderTrigger: (props: { onClick: () => void }) => ReactElement
}

export function ShowQRCodeModal({ qrcode, renderTrigger }: Props) {
  const [opened, { close, open }] = useDisclosure(false)

  const url = process.env.NEXT_PUBLIC_APP_ORIGIN + '/find/' + qrcode.id

  return (
    <>
      {renderTrigger({ onClick: open })}
      <Modal
        onClose={close}
        opened={opened}
        title={<Text fw={'bold'}>{qrcode.name}</Text>}
      >
        <Center>
          <ReactQRCode value={url} />
        </Center>

        <Group justify={'flex-end'} mt={'md'}>
          <Button onClick={close}>閉じる</Button>
        </Group>
      </Modal>
    </>
  )
}
