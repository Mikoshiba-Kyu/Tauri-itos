import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { timelineState } from '../../../atoms/timelineState'
import {
  Stack,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Avatar,
} from '@mui/material'
import SpokeIcon from '@mui/icons-material/Spoke'
import { Spacer } from '../../UI/Spacer'
import { ConversationData, Timeline, TimelineData } from '../../../types/types'
import { saveTextFileInDataDir, getDataDirPath } from '../../../utils/files'
import { getDataTimeNow } from '../../../utils/datetime'
import { t } from 'i18next'
import { v4 as uuidv4 } from 'uuid'
import { open } from '@tauri-apps/api/dialog'
import { copyFile } from '@tauri-apps/api/fs'
import { basename } from '@tauri-apps/api/path'
import { convertFileSrc } from '@tauri-apps/api/tauri'

const style = {
  flexGrow: 1,
  width: '100%',
  padding: '1rem',
  overflowY: 'auto',
}

export interface Props {
  setExpandMenu: (value: string) => void
}

const NewTalkMenu = (props: Props) => {
  const { setExpandMenu }: Props = props

  const [titleVal, setTitleValue] = useState('')
  const [promptVal, setPromptValue] = useState('')
  const [avaterFileName, setAvatarFileName] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [timeline, setTimeline] = useRecoilState(timelineState)
  const [dataDirPath, setDataDirPath] = useState('')

  useEffect(() => {
    ;(async () => {
      const result = await getDataDirPath()
      setDataDirPath(result)
    })()
  }, [])

  const checkTitle = (checkedValue: string): boolean => {
    return timeline.some((data: TimelineData) => data.name === checkedValue)
  }

  const submit = async () => {
    const id = uuidv4()
    const name = titleVal
    const conversations: ConversationData[] = [
      {
        number: 0,
        timestamp: getDataTimeNow(),
        model: '',
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
        message: { role: 'system', content: promptVal },
      },
    ]

    const data = {
      id,
      name,
      assistantIconFileName: avaterFileName,
      conversations,
    }

    // トークファイルを生成する
    await saveTextFileInDataDir(`${id}.json`, JSON.stringify(data, null, 2))

    // タイムライン先頭に新規会話を表示する
    const newTimeline: Timeline = [
      { id: data.id, name: data.name, visible: true, columnWidth: 400 },
      ...timeline,
    ]
    await saveTextFileInDataDir(
      'Timeline.json',
      JSON.stringify(newTimeline, null, 2)
    )
    setTimeline(newTimeline)

    // メニューを閉じる
    setExpandMenu('')
  }

  const handleClickAvatar = async (): Promise<void> => {
    const result: string | string[] | null = await open({
      multiple: false,
      filters: [
        {
          name: 'Images',
          extensions: ['png', 'jpg', 'jpeg', 'gif', 'bmp'],
        },
      ],
    })

    if (!result) return

    const filePath = result as string

    // 画像ファイル以外の時は処理を終了する
    const pattern = /.*\.(png|jpg|jpeg|gif|bmp)$/
    if (!pattern.test(filePath)) return

    // 選択されたファイルをdataにコピーする
    const rsultFileName = await basename(filePath)
    await copyFile(filePath, `${dataDirPath}${rsultFileName}`)

    setAvatarFileName(rsultFileName)
  }

  return (
    <Stack sx={style}>
      <FormControl>
        <FormLabel>
          <Typography variant="caption">
            {t('newConversations.enterTitle')}
          </Typography>
        </FormLabel>
      </FormControl>

      <TextField
        value={titleVal}
        error={titleError}
        helperText={titleError && t('newConversations.sameTitleError')}
        fullWidth
        required
        size="small"
        variant="standard"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setTitleValue(event.target.value)
          setTitleError(checkTitle(event.target.value))
        }}
        sx={{
          borderBottom: '1px solid',
          borderBottomColor: 'inputOutline.primary',
        }}
      />

      <Spacer size="2rem" />

      <FormControl>
        <FormLabel>
          <Typography variant="caption">
            {t('newConversations.assistantAvatar')}
          </Typography>
        </FormLabel>

        <Avatar
          variant="square"
          src={convertFileSrc(`${dataDirPath}${avaterFileName}`)}
          sx={{
            width: 82,
            height: 82,
            border: '2px solid',
            borderColor: 'primary.main',
            borderRadius: '0.5rem',
            margin: '0.5rem',
          }}
          onClick={handleClickAvatar}
        >
          <SpokeIcon
            fontSize="large"
            sx={{ width: '100%', height: '100%', backgroundColor: 'darkcyan' }}
          />
        </Avatar>
      </FormControl>

      <Spacer size="2rem" />

      <FormControl>
        <FormLabel>
          <Typography variant="caption">
            {t('newConversations.enterPrompt')}
          </Typography>
        </FormLabel>
      </FormControl>

      <TextField
        value={promptVal}
        fullWidth
        multiline
        rows={20}
        size="small"
        variant="outlined"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPromptValue(event.target.value)
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& > fieldset': { borderColor: 'inputOutline.primary' },
          },
        }}
      />

      <Spacer size="1rem" />

      <Button
        variant="outlined"
        disabled={titleError || titleVal === ''}
        onClick={submit}
        sx={{ marginTop: '1rem' }}
      >
        {t('newConversations.ok')}
      </Button>
    </Stack>
  )
}

export default NewTalkMenu
