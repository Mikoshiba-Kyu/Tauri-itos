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

export interface Props {
  talkFile?: TalkFile
  scrollRef: React.RefObject<HTMLDivElement>
  isAcorrdionOpen: boolean
}

export interface MessageAvatarProps {
  talk: TalkData
}

const style = {
  width: '100%',
  overflowY: 'auto',
}

// TODO: カラーにテーマを適用する
const cardStyle = {
  width: '100%',
  padding: '1rem',
  borderBottom: '1px solid #343434',
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
    ? 'calc(100vh - var(--column-header-height) - var(--column-open-input-height) - 56px)' // TODO: 56pxのズレがどこから生まれるのか調査する
    : 'calc(100vh - var(--column-header-height) - var(--column-close-input-height) - 8px)' // TODO: 8pxのズレがどこから生まれるのか調査する

  if (!talkFile || talkFile.talks.length === 1) {
    return (
      <BlankContents
        message={t('timeline.noConversations')}
        height={bodyHeight}
      />
    )
  }

  // talkFileを画面表示用に整形する
  const displayTalks = talkFile.talks.filter((talk) => talk.role !== 'system')
  settings.TimelineSort !== 'asc' && displayTalks.reverse()

  // Set Avatar
  const MessageAvatar = (props: MessageAvatarProps) => {
    const { talk } = props
    {
      return talk.role === 'user' ? (
        <Avatar
          src={convertFileSrc(`${dataDirPath}${settings.UserIconFileName}`)}
          sx={{ width: 36, height: 36 }}
        >
          <PersonIcon />
        </Avatar>
      ) : (
        <Avatar
          src={convertFileSrc(`${dataDirPath}test.png`)} // TODO: talkFileにgptAvatarFileNameを追加し、そちらを参照するようにする
          sx={{ width: 36, height: 36, backgroundColor: 'darkcyan' }}
        >
          <SpokeIcon />
        </Avatar>
      )
    }
  }

  return (
    <Box ref={scrollRef} sx={{ ...style, height: bodyHeight }}>
      {displayTalks.map((talk: TalkData, i) => {
        return (
          <Box key={i} sx={cardStyle}>
            <Grid container>
              <Grid sx={{ width: '48px' }}>
                <MessageAvatar talk={talk} />
              </Grid>
              <Grid sx={{ width: 'calc(100% - 48px)' }}>
                <Typography variant="body2">{talk.content}</Typography>
              </Grid>
            </Grid>
          </Box>
        )
      })}
    </Box>
  )
}
export default Body
