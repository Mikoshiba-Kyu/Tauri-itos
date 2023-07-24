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
  const { talkFile, setTalkFile, scrollRef, setIsAccordionOpen } = props

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

      // 現在の talkFile をロールバック用に取得する
      const baseData: TalkFile = talkFile

      // 追記用の talkData を作成する
      const userTalkData: TalkData = {
        number: 0, //TODO: 実際の番号を算出する。beforeData内の最後の番号 + 1
        timestamp: 'timestamp_test', //TODO: 実際のタイムスタンプを取得する
        message: { role: 'user', content: messageValue },
      }

      // ユーザー発言後の talkData を作成する
      const addedUserTalkFile: TalkFile = {
        ...talkFile,
        talks: [...talkFile.talks, userTalkData],
      }

      setTalkFile(addedUserTalkFile)

      setMessageValue('')
      adjustScroll(scrollRef, settings.timelineSort)

      // sendDataに、addedUserTalkFileのtalks内のmessagesのオブジェクトをセットする
      const sendData: { role: string; content: string }[] = [
        ...addedUserTalkFile.talks.map((talkData) => {
          return talkData.message
        }),
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

        // response から talkData を作成する
        const resTalkData: TalkData = {
          number: 0, //TODO: 実際の番号を算出する。beforeData内の最後の番号 + 1
          timestamp: 'timestamp_res', //TODO: 実際のタイムスタンプを取得する
          model: res.model,
          promptTokens: res.usage.prompt_tokens,
          completionTokens: res.usage.completion_tokens,
          totalTokens: res.usage.total_tokens,
          message: res.choices[0].message,
        }

        // talkFileのステートを更新し、描画結果にスクロールを反映する
        const addedResTalkFile = {
          ...talkFile,
          talks: [...addedUserTalkFile.talks, resTalkData],
        }
        setTalkFile(addedResTalkFile)
        adjustScroll(scrollRef, settings.timelineSort)

        // talkFileを更新する
        const fileName = `${addedResTalkFile.id}.json`
        await saveTextFileInDataDir(
          fileName,
          JSON.stringify(addedResTalkFile, null, 2)
        )
      } catch (err) {
        // baseDataに戻す
        setTalkFile(baseData)

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
