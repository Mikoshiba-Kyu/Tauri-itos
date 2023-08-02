import { useRecoilState } from 'recoil'
import { timelineState } from '../../../atoms/timelineState'
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
} from '@mui/material'
import { ConversationFile, TimelineData } from '../../../types/types'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import SettingsIcon from '@mui/icons-material/Settings'
import CloseIcon from '@mui/icons-material/Close'
import { t } from 'i18next'
import { saveTextFileInDataDir } from '../../../utils/files'
import { useState } from 'react'
import ConversationEdit from '../../UI/ConversationEdit'

export interface Props {
  conversationFile?: ConversationFile
  setConversationFile: (value: ConversationFile) => void
  listeners: any
  columnWidth: string
}

const style = {
  height: 'var(--column-header-height)',
  width: '100%',
  display: 'flex',
}

const Header = (props: Props) => {
  const { conversationFile, setConversationFile, listeners, columnWidth } =
    props
  if (!conversationFile) return null

  const [timeline, setTimeline] = useRecoilState(timelineState)
  const [conversationEditOpen, setConversationEditOpen] = useState(false)

  const getTotalTokenCount = () => {
    const keys = Object.keys(conversationFile.conversations)
    const lastKey: any = keys[keys.length - 1]
    return conversationFile.conversations[lastKey].totalTokens
  }

  const handleConversationEditOpen = () => {
    setConversationEditOpen(true)
  }

  const handleHideColumns = async () => {
    const newTimeline = timeline.map((timelineData: TimelineData) => {
      if (timelineData.id === conversationFile.id) {
        return {
          ...timelineData,
          visible: false,
        }
      } else {
        return timelineData
      }
    })

    await saveTextFileInDataDir('Timeline.json', JSON.stringify(newTimeline))

    setTimeline(newTimeline)
  }

  return (
    <Grid container direction="column" sx={style}>
      <Grid item>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          sx={{ height: '40px' }}
        >
          <Grid item sx={{ display: 'flex', flexGrow: 1 }}>
            <Box
              {...listeners}
              sx={{
                width: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Tooltip title={t('timeline.dragIcon')}>
                <DragIndicatorIcon />
              </Tooltip>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexGrow: 1,
              }}
            >
              <Tooltip title={conversationFile.name}>
                <Typography
                  variant={'body1'}
                  noWrap={true}
                  sx={{
                    color: 'timelineHeaderText.primary',
                    flexGrow: 1,
                    width: `calc(${columnWidth} - 130px)`,
                  }}
                >
                  {conversationFile.name}
                </Typography>
              </Tooltip>
            </Box>
          </Grid>
          <Grid item>
            <Tooltip title={t('timeline.columnSettings')}>
              <IconButton onClick={handleConversationEditOpen}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Dialog
              onClose={() => setConversationEditOpen(false)}
              open={conversationEditOpen}
            >
              <DialogTitle>
                {t('editConversations.editConversations')}
              </DialogTitle>
              <Box sx={{ display: 'flex', width: '600px', height: '840px' }}>
                <ConversationEdit
                  editMode="edit"
                  conversationFile={conversationFile}
                  setConversationFile={setConversationFile}
                  handleClose={() => setConversationEditOpen(false)}
                />
              </Box>
            </Dialog>
            <Tooltip title={t('timeline.hideColumns')}>
              <IconButton onClick={handleHideColumns}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" justifyContent="flex-end">
          <Grid item>
            <Typography
              variant="caption"
              sx={{
                color: 'timelineText.secondary',
                paddingRight: '0.6rem',
              }}
            >
              {`Total Tokens : ${getTotalTokenCount() ?? '-'}`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Header
