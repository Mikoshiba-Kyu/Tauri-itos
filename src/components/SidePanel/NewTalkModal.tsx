import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { talkListState } from '../../atoms/talkList'
import { columnListState } from '../../atoms/columnList'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material'
import { Spacer } from '../UI/Spacer'
import {
  saveTalkFile,
  saveTalkListFile,
  saveColumnListFile,
} from '../../utils/files'
import { v4 as uuidv4 } from 'uuid'
import { TalkData, TalkList } from '../../types/types'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  bgcolor: 'background.paper',
  borderRadius: '0.6rem',
  boxShadow: 24,
  p: 4,
}

export interface Props {
  handleNewTalkClose: () => void
}

const NewTalkModal = (props: Props) => {
  const { handleNewTalkClose }: Props = props

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

    // モーダルを閉じる
    handleNewTalkClose()
  }

  return (
    <Box sx={style}>
      <Spacer size="1rem" />

      <FormControl>
        <FormLabel>
          <Typography variant="caption">
            新しい会話のタイトルを入力してください。
          </Typography>
        </FormLabel>
      </FormControl>

      <Spacer size="1rem" />

      <TextField
        value={titleVal}
        error={titleError}
        helperText={titleError && '同名のトークルームがすでに存在しています。'}
        fullWidth
        required
        size="small"
        variant="standard"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setTitleValue(event.target.value)
          setTitleError(checkTitle(event.target.value))
        }}
      />

      <Spacer size="1rem" />

      <FormControl>
        <FormLabel>
          <Typography variant="caption">
            プロンプトを入力してください。
          </Typography>
        </FormLabel>
      </FormControl>

      <Spacer size="1rem" />

      <TextField
        value={promptVal}
        fullWidth
        multiline
        rows={14}
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
        決定
      </Button>
    </Box>
  )
}

export default NewTalkModal
