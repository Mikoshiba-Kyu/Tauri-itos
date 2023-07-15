import { useState } from 'react'
import { flushSync } from 'react-dom'
import { useRecoilValue } from 'recoil'
import { settingsState } from '../../atoms/settingsState'
import { saveTalkFile } from '../../utils/files'
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

const inputStyle: object = {
  width: '100%',
  height: 'var(--column-open-input-height)',
}

interface Props {
  talkFile: TalkFile
  setTalkFile: any
}

const InputBox = (props: Props) => {
  const { talkFile, setTalkFile } = props

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

      // const sendingAll: any = [...talkData, { role: 'user', content: inputVal }]
      // setTalkData(sendingAll)

      // 送信用のデータを作成し、テキストフィールドを空にする
      const sendData: TalkData[] = [
        ...talkFile.talks,
        { role: 'user', content: messageValue },
      ]

      setTalkFile({ ...talkFile, talks: sendData })
      setMessageValue('')

      // setTimeout(() => {
      //   if (props.scrollRef.current) {
      //     const element = props.scrollRef.current
      //       .lastElementChild as HTMLElement
      //     element.scrollIntoView({ behavior: 'smooth', block: 'end' })
      //   }
      // }, 0)

      // OpenAIのAPIを叩く
      const configuration = new Configuration({ apiKey })
      const openai = new OpenAIApi(configuration)

      try {
        const response = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo-0301',
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

        // setTimeout(() => {
        //   if (props.scrollRef.current) {
        //     const element = props.scrollRef.current
        //       .lastElementChild as HTMLElement
        //     element.scrollIntoView({ behavior: 'smooth', block: 'end' })
        //   }
        // }, 0)

        // talkFileを更新する
        // TODO talksの型が違うので、可能であれば型を合わせたい
        //@ts-ignore
        await saveTalkFile(fixedTalkFile)
      } catch (err) {
        return {
          role: 'assistant',
          content: 'エラーです',
        }
      }
    })
  }

  return (
    <Accordion disableGutters>
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
