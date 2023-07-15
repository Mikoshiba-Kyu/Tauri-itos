import { useState } from 'react'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil'
import { talkListState } from '../../atoms/talkList'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material'
import { Spacer } from '../Spacer'
import { saveTalks } from '../../utils/files'
import { v4 as uuidv4 } from 'uuid'

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

const NewTalkModal = () => {
  const [titleVal, setTitleValue] = useState('')
  const [promptVal, setPromptValue] = useState('')
  const [titleError, setTitleError] = useState(false)

  // TODO: useRecoilValueで取得すると配列ではなくなってしまう。この書き方しか方法がないのか調査する
  const loadableTalkList = useRecoilValueLoadable(talkListState)
  const talkList =
    loadableTalkList.state === 'hasValue' ? loadableTalkList.contents : []

  const checkTitle = (checkedValue: string): boolean => {
    return talkList.some((talk) => talk.name === checkedValue)
  }

  const submit = async () => {
    //setTalkNameList([...talkRoomList, inputVal])
    //await saveTalks([], inputVal)
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
