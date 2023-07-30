import { Box, Grid, Typography, IconButton, Tooltip } from '@mui/material'
import { ConversationFile } from '../../types/types'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { t } from 'i18next'

export interface Props {
  conversationFile?: ConversationFile
  listeners: any
  columnWidth: string | number
}

const style = {
  height: 'var(--column-header-height)',
  width: '100%',
  display: 'flex',
}

const Header = (props: Props) => {
  const { conversationFile, listeners, columnWidth } = props
  if (!conversationFile) return null

  const getTotalTokenCount = () => {
    const keys = Object.keys(conversationFile.conversations)
    const lastKey: any = keys[keys.length - 1]
    return conversationFile.conversations[lastKey].totalTokens
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
                <DragIndicatorIcon sx={{}} />
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
              <Typography
                variant={'h6'}
                noWrap={true}
                sx={{
                  color: 'timelineHeaderText.primary',
                  flexGrow: 1,
                  width: `calc(${columnWidth} - 90px)`,
                  display: 'inline-block',
                }}
              >
                {conversationFile.name}
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
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
