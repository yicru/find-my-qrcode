import { client } from '@/client/lib/client'
import { Button, Group, Modal, Text, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { ReactElement } from 'react'
import { useSWRConfig } from 'swr'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, { message: '1文字以上で入力してください' }),
})

type FormValues = z.infer<typeof schema>

type Props = {
  renderTrigger: (props: { onClick: () => void }) => ReactElement
}

export function CreateQRCodeModal({ renderTrigger }: Props) {
  const [opened, { close, open }] = useDisclosure(false)

  const { mutate } = useSWRConfig()

  const form = useForm<FormValues>({
    initialValues: {
      name: '',
    },
    validate: zodResolver(schema),
  })

  const handleSubmit = async (values: FormValues) => {
    try {
      await client.api.qrcodes.$post({
        json: {
          name: values.name,
        },
      })
      await mutate('qrcodes')
      form.reset()
      close()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      {renderTrigger({ onClick: open })}
      <Modal
        onClose={close}
        opened={opened}
        title={<Text fw={'bold'}>QRコードを作成する</Text>}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
