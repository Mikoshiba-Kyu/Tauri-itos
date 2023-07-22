import { useState } from 'react'
import { flushSync } from 'react-dom'
import { useRecoilValue } from 'recoil'
import { settingsState } from '../../atoms/settingsState'
import { saveTextFileInDataDir } from '../../utils/files'
import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
  Configuration,
  OpenAIApi,
} from 'openai'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SendIcon from '@mui/icons-material/Send'
import { TalkFile, TalkData } from '../../types/types'

export interface Props {
  talkFile: TalkFile
  setTalkFile: any
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
    talkFile,
    setTalkFile,
    scrollRef,
    isAccordionOpen,
    setIsAccordionOpen,
  } = props

  const [messageValue, setMessageValue] = useState<string>('')
  const settings = useRecoilValue(settingsState)

  const sending = async () => {
    flushSync(async () => {
      // ChatGPTのAPIが設定されていなければ処理を終了する
      const apiKey = settings.ApiKey
      if (!apiKey) {
        console.log('API Key is not set.') // TODO: ここでエラーを出す
        return
      }

      // 送信用のデータを作成し、テキストフィールドを空にする
      const beforeData: TalkFile = talkFile
      const sendData: TalkData[] = [
        ...beforeData.talks,
        { role: 'user', content: messageValue },
      ]

      setTalkFile({ ...talkFile, talks: sendData })
      setMessageValue('')
      adjustScroll(scrollRef, settings.TimelineSort)

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

        const res: ChatCompletionResponseMessage | undefined =
          response.data.choices[0].message

        if (!res) {
          console.log('ChatCompletionResponseMessage is undefined.') //TODO: ここでエラーを出す
          return
        }

        // talkFileのステートを更新し、描画結果にスクロールを反映する
        const fixedTalkFile = { ...talkFile, talks: [...sendData, res] }
        setTalkFile(fixedTalkFile)
        adjustScroll(scrollRef, settings.TimelineSort)

        // talkFileを更新する
        const fileName = `${fixedTalkFile.id}.json`
        await saveTextFileInDataDir(
          fileName,
          JSON.stringify(fixedTalkFile, null, 2)
        )
      } catch (err) {
        // beforeDataに戻す
        setTalkFile(beforeData)

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
        expandIcon={<ExpandMoreIcon fontSize="small" />}
        aria-controls="panel1a-content"
        sx={{ minHeight: 'var(--column-close-input-height)' }}
      ></AccordionSummary>
      <AccordionDetails>
        <Box sx={inputStyle}>
          <FormControl
            variant="outlined"
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column-reverse',
            }}
          >
            <OutlinedInput
              id="text-input"
              value={messageValue}
              multiline
              fullWidth
              rows={7}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setMessageValue(event.target.value)
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={sending} disabled={messageValue === ''}>
                    <SendIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default InputBox
