import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { talkRoomNames } from '../../atoms/talkRoomNames'
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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 400,
  bgcolor: 'background.paper',
  borderRadius: '0.6rem',
  boxShadow: 24,
  p: 4,
}

const NewTalkModal = () => {
  const [inputVal, setInputValue] = useState('')
  const [inputError, setInputError] = useState(false)
  const [talkRoomList, setTalkNameList] = useRecoilState(talkRoomNames)

  const checkValue = (checkedValue: string): boolean => {
    return talkRoomList.includes(checkedValue)
  }

  const submit = async () => {
    if (inputVal === '') return
    if (inputError) return

    setTalkNameList([...talkRoomList, inputVal])

    await saveTalks([], inputVal)
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
        value={inputVal}
        error={inputError}
        helperText={inputError && '同名のトークルームがすでに存在しています。'}
        fullWidth
        size="small"
        variant="standard"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(event.target.value)
          setInputError(checkValue(event.target.value))
        }}
      />
      <Button
        variant="outlined"
        disableElevation
        onClick={submit}
        sx={{ marginTop: '1rem' }}
      >
        決定
      </Button>
    </Box>
  )
}

export default NewTalkModal
