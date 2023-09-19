import { Button, Group, Modal, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { ReactElement } from 'react'

type Props = {
  renderTrigger: (props: { onClick: () => void }) => ReactElement
}

export function CreateQRCodeModal({ renderTrigger }: Props) {
  const [opened, { close, open }] = useDisclosure(false)

  const form = useForm({
    initialValues: {
      name: '',
    },
  })

  return (
    <>
      {renderTrigger({ onClick: open })}
      <Modal
        onClose={close}
        opened={opened}
        title={<Text fw={'bold'}>QRコードを作成する</Text>}
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            label={'なまえ'}
            placeholder={'例）鍵'}
            withAsterisk
            {...form.getInputProps('name')}
          />

          <Group justify={'flex-end'} mt={'md'}>
            <Button onClick={close} type={'button'} variant={'default'}>
              キャンセル
            </Button>
            <Button type={'submit'}>作成</Button>
          </Group>
        </form>
      </Modal>
    </>
  )
}
