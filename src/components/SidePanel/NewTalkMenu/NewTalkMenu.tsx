import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { talkListState } from '../../../atoms/talkList'
import { columnListState } from '../../../atoms/columnList'
import {
  Stack,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Avatar,
} from '@mui/material'
import { Spacer } from '../../UI/Spacer'
import { saveTextFileInDataDir, getDataDirPath } from '../../../utils/files'
import { v4 as uuidv4 } from 'uuid'
import { TalkData, TalkList } from '../../../types/types'
import { t } from 'i18next'
import SpokeIcon from '@mui/icons-material/Spoke'
import { open } from '@tauri-apps/api/dialog'
import { copyFile } from '@tauri-apps/api/fs'
import { basename } from '@tauri-apps/api/path'
import { convertFileSrc } from '@tauri-apps/api/tauri'

const style = {
  width: '100%',
  height: 'calc(100% - var(--expand-menu-header-height) - 34px)', // TODO: 34pxのズレがどこから生まれるのか調査する
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
  const [talkList, setTalkList] = useRecoilState(talkListState)
  const [columnList, setColumnList] = useRecoilState(columnListState)

  const [dataDirPath, setDataDirPath] = useState('')

  useEffect(() => {
    ;(async () => {
      const result = await getDataDirPath()
      setDataDirPath(result)
    })()
  }, [])

  const checkTitle = (checkedValue: string): boolean => {
    return talkList.some((talk) => talk.name === checkedValue)
  }

  const submit = async () => {
    const id = uuidv4()
    const name = titleVal
    const talks: TalkData[] = [
      {
        number: 0,
        timestamp: 'timestamp_prompt', //TODO: 実際のタイムスタンプを取得する
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
      talks,
    }

    // トークファイルを生成する
    await saveTextFileInDataDir(`${id}.json`, JSON.stringify(data, null, 2))

    // トークリストファイルを更新する
    const newTalkList: TalkList = [
      ...talkList,
      { id: data.id, name: data.name },
    ]
    await saveTextFileInDataDir(
      'TalkList.json',
      JSON.stringify(newTalkList, null, 2)
    )
    setTalkList(newTalkList)

    // カラムリストファイルを更新する
    const newColumnList = [data.id, ...columnList]
    await saveTextFileInDataDir(
      'ColumnList.json',
      JSON.stringify(newColumnList, null, 2)
    )
    setColumnList(newColumnList)

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
          <SpokeIcon fontSize="large" />
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
