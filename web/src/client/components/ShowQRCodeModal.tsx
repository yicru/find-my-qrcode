import { Qrcode } from '.prisma/client'
import { Anchor, Button, Center, Group, Modal, Text } from '@mantine/core'
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
        title={
          <Text>
            {qrcode.emoji && (
              <Text className={'mr-2'} component={'span'}>
                {qrcode.emoji}
              </Text>
            )}
            <Text component={'span'} fw={'bold'}>
              {qrcode.name}
            </Text>
          </Text>
        }
      >
        <Center className={'flex-col'}>
          <ReactQRCode value={url} />

          <Anchor className={'mt-4 text-xs'} href={url} target={'_blank'}>
            {url}
          </Anchor>
        </Center>

        <Group justify={'flex-end'} mt={'md'}>
          <Button onClick={close}>閉じる</Button>
        </Group>
      </Modal>
    </>
  )
}
