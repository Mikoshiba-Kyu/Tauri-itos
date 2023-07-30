import { useState } from 'react'
import { flushSync } from 'react-dom'
import { useRecoilValue } from 'recoil'
import { settingsState } from '../../atoms/settingsState'
import { saveTextFileInDataDir } from '../../utils/files'
import { t } from 'i18next'
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  FormControl,
  FormLabel,
  Typography,
  TextField,
  Button,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ConversationFile, ConversationData } from '../../types/types'
import { getDataTimeNow } from '../../utils/datetime'

export interface Props {
  conversationFile: ConversationFile
  setConversationFile: any
  scrollRef: React.RefObject<HTMLDivElement>
  isAccordionOpen: boolean
  setIsAccordionOpen: any
}

const adjustScroll = (
  scrollRef: React.RefObject<HTMLDivElement>,
  timelineSort?: string
) => {
  setTimeout(() => {
    if (scrollRef.current) {
      let element
      timelineSort !== 'asc'
        ? (element = scrollRef.current.firstElementChild as HTMLElement)
        : (element = scrollRef.current.lastElementChild as HTMLElement)

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, 0)
}

const inputStyle: object = {
  width: '100%',
  height: 'var(--column-open-input-height)',
}

const InputBox = (props: Props) => {
  const {
    conversationFile,
    setConversationFile,
    scrollRef,
    setIsAccordionOpen,
  } = props

  const [messageValue, setMessageValue] = useState<string>('')
  const settings = useRecoilValue(settingsState)

  const sending = async () => {
    flushSync(async () => {
      // ChatGPTのAPIが設定されていなければ処理を終了する
      const apiKey = settings.apiKey
      if (!apiKey) {
        console.log('API Key is not set.') // TODO: ここでエラーを出す
        return
      }

      // 現在の conversationFile をロールバック用に取得する
      const baseData: ConversationFile = conversationFile

      // ユーザーの発言を追記した ConversationData を作成する
      const userConversationData: ConversationData = {
        number: 0, //TODO: 実際の番号を算出する。beforeData内の最後の番号 + 1
        timestamp: getDataTimeNow(),
        message: { role: 'user', content: messageValue },
      }

      // ユーザーの発言を追記した ConversationFile を作成する
      const addedUserConversationFile: ConversationFile = {
        ...conversationFile,
        conversations: [
          ...conversationFile.conversations,
          userConversationData,
        ],
      }

      setConversationFile(addedUserConversationFile)

      setMessageValue('')
      adjustScroll(scrollRef, settings.timelineSort)

      // sendDataにmessagesのオブジェクトをセットする
      const sendData: { role: string; content: string }[] = [
        ...addedUserConversationFile.conversations.map(
          (conversationData: ConversationData) => {
            return conversationData.message
          }
        ),
      ]

      // OpenAIのAPIを叩く
      const configuration = new Configuration({ apiKey })
      const openai = new OpenAIApi(configuration)

      try {
        const response = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          // TODO: Settingsからモデルを選択できるようにする
          // model: 'gpt-3.5-turbo',
          // model: 'gpt-4',
          messages: sendData as ChatCompletionRequestMessage[],
        })

        const res: any | undefined = response.data
        if (!res) {
          console.log('ChatCompletionResponseMessage is undefined.') //TODO: ここでエラーを出す
          return
        }

        // response から ConversationData を作成する
        const resConversationData: ConversationData = {
          number: 0, //TODO: 実際の番号を算出する。beforeData内の最後の番号 + 1
          timestamp: getDataTimeNow(),
          model: res.model,
          promptTokens: res.usage.prompt_tokens,
          completionTokens: res.usage.completion_tokens,
          totalTokens: res.usage.total_tokens,
          message: res.choices[0].message,
        }

        // response から ConversationFile を作成する
        const addedResConversationFile = {
          ...conversationFile,
          conversations: [
            ...addedUserConversationFile.conversations,
            resConversationData,
          ],
        }
        setConversationFile(addedResConversationFile)
        adjustScroll(scrollRef, settings.timelineSort)

        // ConversationFile を更新する
        const fileName = `${addedResConversationFile.id}.json`
        await saveTextFileInDataDir(
          fileName,
          JSON.stringify(addedResConversationFile, null, 2)
        )
      } catch (err) {
        // baseDataに戻す
        setConversationFile(baseData)

        // TODO: SnackBarでエラーを表示する

        return {
          role: 'assistant',
          content: 'エラーです',
        }
      }
    })
  }

  return (
    <Accordion
      disableGutters
      onChange={(_event: React.SyntheticEvent, expanded: boolean) =>
        setIsAccordionOpen(expanded)
      }
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon fontSize="small" sx={{ color: 'icon.primary' }} />
        }
        aria-controls="panel1a-content"
        sx={{ minHeight: 'var(--column-close-input-height)' }}
      ></AccordionSummary>
      <AccordionDetails>
        <Box sx={inputStyle}>
          <FormControl>
            <FormLabel>
              <Typography variant="caption">
                {t('timeline.enterMessage')}
              </Typography>
            </FormLabel>
          </FormControl>

          <TextField
            value={messageValue}
            fullWidth
            multiline
            rows={10}
            size="small"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setMessageValue(event.target.value)
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& > fieldset': { borderColor: 'inputOutline.primary' },
              },
            }}
          />

          <Button
            variant="outlined"
            disabled={messageValue === ''}
            onClick={sending}
            sx={{ marginTop: '1rem' }}
          >
            {t('timeline.send')}
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default InputBox
