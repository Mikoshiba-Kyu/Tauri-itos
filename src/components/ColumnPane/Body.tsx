import { useRecoilValue } from 'recoil'
import { settingsState } from '../../atoms/settingsState'
import { Box, Typography, Grid, Avatar } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import SpokeIcon from '@mui/icons-material/Spoke'
import { TalkFile, TalkData } from '../../types/types'
import BlankContents from '../UI/BlankContents'
import { t } from 'i18next'
import { getDataDirPath } from '../../utils/files'
import { useEffect, useState } from 'react'
import { convertFileSrc } from '@tauri-apps/api/tauri'
import { Spacer } from '../UI/Spacer'

export interface Props {
  talkFile?: TalkFile
  scrollRef: React.RefObject<HTMLDivElement>
  isAcorrdionOpen: boolean
}

export interface MessageAvatarProps {
  talkData: TalkData
}

const style = {
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
  const { talkFile, scrollRef, isAcorrdionOpen } = props

  const [dataDirPath, setDataDirPath] = useState('')
  useEffect(() => {
    ;(async () => {
      const result = await getDataDirPath()
      setDataDirPath(result)
    })()
  }, [])

  const settings = useRecoilValue(settingsState)

  const bodyHeight = isAcorrdionOpen
    ? 'calc(100vh - var(--column-header-height) - var(--column-open-input-height) - 74px)' // TODO: 74pxのズレがどこから生まれるのか調査する
    : 'calc(100vh - var(--column-header-height) - var(--column-close-input-height) - 24px)' // TODO: 24pxのズレがどこから生まれるのか調査する

  if (!talkFile || Object.keys(talkFile.talks).length <= 1) {
    return (
      <BlankContents
        message={t('timeline.noConversations')}
        height={bodyHeight}
      />
    )
  }

  // talkFileを画面表示用に整形する
  const displayTalks: TalkData[] = talkFile.talks.filter(
    (talkData) => talkData.message.role !== 'system'
  )
  settings.timelineSort !== 'asc' && displayTalks.reverse()

  // Set Avatar
  const MessageAvatar = (props: MessageAvatarProps) => {
    const { talkData } = props
    {
      return talkData.message.role === 'user' ? (
        <Avatar
          src={convertFileSrc(`${dataDirPath}${settings.userIconFileName}`)}
          sx={{ width: 36, height: 36 }}
        >
          <PersonIcon />
        </Avatar>
      ) : (
        <Avatar
          src={convertFileSrc(
            `${dataDirPath}${talkFile.assistantIconFileName}`
          )}
          sx={{ width: 36, height: 36, backgroundColor: 'darkcyan' }}
        >
          <SpokeIcon />
        </Avatar>
      )
    }
  }

  return (
    <Box ref={scrollRef} sx={{ ...style, height: bodyHeight }}>
      {displayTalks.map((talkData: TalkData, i) => {
        return (
          <Box key={i} sx={cardStyle}>
            <Grid container>
              <Grid sx={{ width: '48px' }}>
                <MessageAvatar talkData={talkData} />
              </Grid>
              <Grid sx={{ width: 'calc(100% - 48px)' }}>
                <Typography
                  variant="body2"
                  sx={{ color: 'timelineText.primary', userSelect: 'text' }}
                >
                  {talkData.message.content}
                </Typography>

                <Spacer size="1rem"></Spacer>

                <Grid container direction="row" justifyContent="space-between">
                  <Typography
                    variant="caption"
                    sx={{ color: 'timelineText.secondary' }}
                  >
                    {talkData.timestamp ?? ''}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      marginLeft: '0.5rem',
                      color: 'timelineText.secondary',
                    }}
                  >
                    {talkData.model ?? ''}
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
