import { client } from '@/client/lib/client'
import data from '@emoji-mart/data'
import i18n from '@emoji-mart/data/i18n/ja.json'
import Picker from '@emoji-mart/react'
import {
  Button,
  Center,
  Group,
  Modal,
  Popover,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { ReactElement, useState } from 'react'
import { useSWRConfig } from 'swr'
import { z } from 'zod'

const schema = z.object({
  emoji: z.string(),
  name: z.string().min(1, { message: '1文字以上で入力してください' }),
})

type FormValues = z.infer<typeof schema>

type Props = {
  renderTrigger: (props: { onClick: () => void }) => ReactElement
}

export function CreateQRCodeModal({ renderTrigger }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [opened, { close, open }] = useDisclosure(false)
  const [openedEmoji, setOpenedEmoji] = useState(false)

  const { mutate } = useSWRConfig()

  const form = useForm<FormValues>({
    initialValues: {
      emoji: '',
      name: '',
    },
    validate: zodResolver(schema),
  })

  const onEmojiSelected = (emoji: string) => {
    form.setValues({ ...form.values, emoji })
    setOpenedEmoji(false)
  }

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true)
    try {
      await client.api.qrcodes.$post({
        json: {
          emoji: values.emoji,
          name: values.name,
        },
      })
      await mutate('qrcodes')
      form.reset()
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
          <Text className={'font-bold text-neutral-600'}>
            QRコードを作成する
          </Text>
        }
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Popover
            onChange={setOpenedEmoji}
            opened={openedEmoji}
            position={'bottom'}
            width={352}
            withArrow
          >
            <Popover.Target>
              <Center>
                <Center
                  className={
                    'h-20 w-20 cursor-pointer rounded-full bg-gray-200 p-3'
                  }
                  onClick={() => setOpenedEmoji(true)}
                >
                  <Text className={'text-4xl'}>{form.values.emoji}</Text>
                </Center>
              </Center>
            </Popover.Target>
            <Popover.Dropdown
              className={'border-none bg-transparent p-0 shadow-lg'}
            >
              <Picker
                data={data}
                i18n={i18n}
                onEmojiSelect={(data: { native: string }) =>
                  onEmojiSelected(data.native)
                }
                theme={'light'}
              />
            </Popover.Dropdown>
          </Popover>

          <TextInput
            label={'なまえ'}
            placeholder={'例）鍵'}
            withAsterisk
            {...form.getInputProps('name')}
          />

          <Group justify={'flex-end'} mt={'md'}>
            <Button
              disabled={isLoading}
              onClick={close}
              type={'button'}
              variant={'default'}
            >
              キャンセル
            </Button>
            <Button loading={isLoading} type={'submit'}>
              作成
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  )
}
