import { useState } from 'react'
import {
  Box,
  FormLabel,
  List,
  ListItem,
  ListItemText,
  Typography,
  Checkbox,
  ListItemIcon,
  ListItemButton,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material'
import { useRecoilState } from 'recoil'
import { timelineState } from '../../../atoms/timelineState'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Spacer } from '../../UI/Spacer'
import { saveTextFileInDataDir } from '../../../utils/files'
import { t } from 'i18next'
import { ConversationFile, TimelineData } from '../../../types/types'
import {
  loadTextFileInDataDir,
  deleteFileInDataDir,
} from '../../../utils/files'
import Body from '../../ColumnPane/Body'

const style = {
  width: '100%',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  overflowY: 'auto',
}

const conversationListStyle = {
  height: '16rem',
  overflowY: 'auto',
  border: '1px solid',
  borderColor: 'timelineBorder.primary',
  borderRadius: '4px',
}

const conversationPreviewStyle = {
  flexGrow: 1,
  display: 'flex',
  border: '1px solid',
  borderColor: 'timelineBorder.primary',
  borderRadius: '4px',
  overflowY: 'auto',
}

const EditColumnsMenu = () => {
  const [timeline, setTimeline] = useRecoilState(timelineState)

  const [selectedId, setSelectedId] = useState<string | undefined>()
  const [conversationFile, setConversationFile] = useState<
    ConversationFile | undefined
  >(undefined)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const handleListItemClick = async (id: string) => {
    console.log(id)
    setSelectedId(id)

    const setData = async () => {
      const textObject = await loadTextFileInDataDir(`${id}.json`)
      const result: ConversationFile = textObject as ConversationFile
      setConversationFile(result)
    }
    setData()
  }

  const handleCheck = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newTimeline = timeline.map((timelineData: TimelineData) => {
      if (timelineData.id === id) {
        return {
          ...timelineData,
          visible: event.target.checked,
        }
      } else {
        return timelineData
      }
    })

    setTimeline(newTimeline)
    await saveTextFileInDataDir('Timeline.json', JSON.stringify(newTimeline))
  }

  const handleDelete = async (id: string) => {
    //   const deletedTimeline = timeline.filter(
    //     (timelineData: TimelineData) => timelineData.id !== id
    //   )

    //   await saveTextFileInDataDir(
    //     'Timeline.json',
    //     JSON.stringify(deletedTimeline)
    //   )

    //   await deleteFileInDataDir(`${id}.json`)
    console.log(id)
    setSelectedId(undefined)
    handleMenuClose()
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={style}>
      <FormLabel>
        <Typography variant="caption">
          {t('editColumns.conversationList')}
        </Typography>
      </FormLabel>
      <List sx={conversationListStyle}>
        {timeline.map((timelineData: TimelineData) => {
          return (
            <ListItem
              key={timelineData.id}
              disablePadding
              sx={{ height: '2rem' }}
            >
              <ListItemButton
                role={undefined}
                dense
                sx={{ height: '2rem' }}
                selected={selectedId === timelineData.id}
                onClick={() => handleListItemClick(timelineData.id)}
              >
                <ListItemText primary={timelineData.name} />
                <ListItemIcon
                  sx={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Checkbox
                    checked={timelineData.visible}
                    onChange={(event) => handleCheck(event, timelineData.id)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': timelineData.id }}
                  />
                </ListItemIcon>
                <IconButton onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem onClick={async () => handleDelete(timelineData.id)}>
                    デリート
                  </MenuItem>
                </Menu>
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      <Spacer size="1rem"></Spacer>

      <FormLabel>
        <Typography variant="caption">
          {t('editColumns.conversationPreview')}
        </Typography>
      </FormLabel>

      <Box sx={conversationPreviewStyle}>
        {selectedId !== undefined && (
          <Body conversationFile={conversationFile} isPreview={true} />
        )}
      </Box>
    </Box>
  )
}

export default EditColumnsMenu
