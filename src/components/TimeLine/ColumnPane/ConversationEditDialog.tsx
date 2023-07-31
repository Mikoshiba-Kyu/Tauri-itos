import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { timelineState } from '../../../atoms/timelineState'
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import SpokeIcon from '@mui/icons-material/Spoke'
import { open } from '@tauri-apps/api/dialog'
import { copyFile } from '@tauri-apps/api/fs'
import { basename } from '@tauri-apps/api/path'
import { convertFileSrc } from '@tauri-apps/api/tauri'
import {
  ConversationFile,
  ConversationData,
  TimelineData,
} from '../../../types/types'
import { saveTextFileInDataDir, getDataDirPath } from '../../../utils/files'
import { t } from 'i18next'
import { Spacer } from '../../UI/Spacer'

const style = {
  flexGrow: 1,
  padding: '1rem',
  overflowY: 'auto',
  width: '600px',
  height: '900px',
}

interface Props {
  conversationFile: ConversationFile
  setConversationFile: (value: ConversationFile) => void
  conversationEditOpen: boolean
  setConversationEditOpen: (open: boolean) => void
}

const ConversationEditDialog = (props: Props) => {
  const {
    conversationFile,
    setConversationFile,
    conversationEditOpen,
    setConversationEditOpen,
  } = props

  const [titleVal, setTitleValue] = useState(conversationFile.name)
  const [promptVal, setPromptValue] = useState(
    conversationFile.conversations[0].message.content
  )
  const [avaterFileName, setAvatarFileName] = useState(
    conversationFile.assistantIconFileName
  )
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

  const handleClose = () => {
    setConversationEditOpen(false)
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

  const submit = async () => {
    const newConversations: ConversationData[] =
      conversationFile.conversations.map(
        (conversation: ConversationData, index: number) => {
          if (index === 0) {
            return {
              ...conversation,
              message: {
                ...conversation.message,
                content: promptVal,
              },
            }
          } else {
            return conversation
          }
        }
      )

    const newConversationFile: ConversationFile = {
      id: conversationFile.id,
      name: titleVal,
      assistantIconFileName: avaterFileName,
      conversations: newConversations,
    }

    setConversationFile(newConversationFile)

    const newTimeline: TimelineData[] = timeline.map(
      (data: TimelineData) => data
    )
    setTimeline(newTimeline) // TODO ここでうまく timeline の atoms を更新しないと、カラムの編集ペーンのリストに反映されない？

    // トークファイルを上書き保存する
    await saveTextFileInDataDir(
      `${conversationFile.id}.json`,
      JSON.stringify(newConversationFile, null, 2)
    )

    handleClose()
  }

  return (
    <Dialog onClose={handleClose} open={conversationEditOpen}>
      <DialogTitle>Edit Conversation</DialogTitle>
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
              sx={{
                width: '100%',
                height: '100%',
                backgroundColor: 'darkcyan',
              }}
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
    </Dialog>
  )
}
export default ConversationEditDialog
