import { useRecoilValue } from 'recoil'
import { settingsState } from '../../atoms/settingsState'
import { Box, Typography, Grid, Avatar } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import SpokeIcon from '@mui/icons-material/Spoke'
import { ConversationFile, ConversationData } from '../../types/types'
import BlankContents from '../UI/BlankContents'
import { t } from 'i18next'
import { getDataDirPath } from '../../utils/files'
import { useEffect, useState } from 'react'
import { convertFileSrc } from '@tauri-apps/api/tauri'
import { Spacer } from '../UI/Spacer'

export interface Props {
  conversationFile?: ConversationFile
  scrollRef?: React.RefObject<HTMLDivElement>
  isPreview?: boolean
}

export interface MessageAvatarProps {
  conversationData: ConversationData
}

const style = {
  flexGrow: 1,
  width: '100%',
  overflowY: 'auto',
}

// TODO: カラーにテーマを適用する
const cardStyle = {
  width: '100%',
  paddingTop: '1rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  borderBottom: '1px solid',
  borderBottomColor: 'timelineBorder.primary',
}

const Body = (props: Props) => {
  const { conversationFile, scrollRef, isPreview } = props

  const [dataDirPath, setDataDirPath] = useState('')
  useEffect(() => {
    ;(async () => {
      const result = await getDataDirPath()
      setDataDirPath(result)
    })()
  }, [])

  const settings = useRecoilValue(settingsState)

  if (
    !conversationFile ||
    Object.keys(conversationFile.conversations).length <= 1
  ) {
    return <BlankContents message={t('timeline.noConversations')} />
  }

  // talkFileを画面表示用に整形する
  const displayTalks: ConversationData[] =
    conversationFile.conversations.filter(
      (conversationData: ConversationData) =>
        conversationData.message.role !== 'system'
    )
  settings.timelineSort !== 'asc' && displayTalks.reverse()

  // Set Avatar
  const MessageAvatar = (props: MessageAvatarProps) => {
    const { conversationData } = props
    {
      return conversationData.message.role === 'user' ? (
        <Avatar
          src={convertFileSrc(`${dataDirPath}${settings.userIconFileName}`)}
          sx={{ width: 36, height: 36 }}
        >
          <PersonIcon />
        </Avatar>
      ) : (
        <Avatar
          src={convertFileSrc(
            `${dataDirPath}${conversationFile.assistantIconFileName}`
          )}
          sx={{ width: 36, height: 36, backgroundColor: 'darkcyan' }}
        >
          <SpokeIcon />
        </Avatar>
      )
    }
  }

  return (
    <Box ref={scrollRef} sx={style}>
      {displayTalks.map((conversationData: ConversationData, index) => {
        return (
          <Box key={index} sx={cardStyle}>
            <Grid container>
              <Grid sx={{ width: '48px' }}>
                <MessageAvatar conversationData={conversationData} />
              </Grid>
              <Grid sx={{ width: 'calc(100% - 48px)' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: !isPreview
                      ? 'timelineText.primary'
                      : 'timelinePreviewText.primary',
                    userSelect: 'text',
                  }}
                >
                  {conversationData.message.content}
                </Typography>

                <Spacer size="1rem"></Spacer>

                <Grid container direction="row" justifyContent="space-between">
                  <Typography
                    variant="caption"
                    sx={{ color: 'timelineText.secondary' }}
                  >
                    {conversationData.timestamp ?? ''}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      marginLeft: '0.5rem',
                      color: 'timelineText.secondary',
                    }}
                  >
                    {conversationData.model ?? ''}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )
      })}
    </Box>
  )
}
export default Body
