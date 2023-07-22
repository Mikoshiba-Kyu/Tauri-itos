import { useState } from 'react'
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
} from '@mui/material'
import { Spacer } from '../../UI/Spacer'
import {
  saveTalkFile,
  saveTalkListFile,
  saveColumnListFile,
} from '../../../utils/files'
import { v4 as uuidv4 } from 'uuid'
import { TalkData, TalkList } from '../../../types/types'
import { t } from 'i18next'

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
  const [titleError, setTitleError] = useState(false)
  const [talkList, setTalkList] = useRecoilState(talkListState)
  const [columnList, setColumnList] = useRecoilState(columnListState)

  const checkTitle = (checkedValue: string): boolean => {
    return talkList.some((talk) => talk.name === checkedValue)
  }

  const submit = async () => {
    const id = uuidv4()
    const name = titleVal
    const talks: TalkData[] = [{ role: 'system', content: promptVal }]

    const data = {
      id,
      name,
      talks,
    }

    // トークファイルを生成する
    await saveTalkFile(data)

    // トークリストファイルを更新する
    const newTalkList: TalkList = [
      ...talkList,
      { id: data.id, name: data.name },
    ]
    await saveTalkListFile(newTalkList)
    setTalkList(newTalkList)

    // カラムリストファイルを更新する
    const newColumnList = [data.id, ...columnList]
    await saveColumnListFile(newColumnList)
    setColumnList(newColumnList)

    // メニューを閉じる
    setExpandMenu('')
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
