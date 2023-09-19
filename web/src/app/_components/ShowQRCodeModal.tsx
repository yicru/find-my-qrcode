import { QRCode } from '.prisma/client'
import { Button, Center, Group, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ReactElement } from 'react'
import ReactQRCode from 'react-qr-code'

type Props = {
  qrcode: QRCode
  renderTrigger: (props: { onClick: () => void }) => ReactElement
}

export function ShowQRCodeModal({ qrcode, renderTrigger }: Props) {
  const [opened, { close, open }] = useDisclosure(false)

  return (
    <>
      {renderTrigger({ onClick: open })}
      <Modal
        onClose={close}
        opened={opened}
        title={<Text fw={'bold'}>{qrcode.name}</Text>}
      >
        <Center>
          <ReactQRCode value={qrcode.id} />
        </Center>

        <Group justify={'flex-end'} mt={'md'}>
          <Button onClick={close}>閉じる</Button>
        </Group>
      </Modal>
    </>
  )
}
