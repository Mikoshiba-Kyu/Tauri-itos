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
import { talkListState } from '../../../atoms/talkList'
import { columnListState } from '../../../atoms/columnList'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Spacer } from '../../UI/Spacer'
import { saveTextFileInDataDir } from '../../../utils/files'
import { t } from 'i18next'
import { TalkFile } from '../../../types/types'
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
  const [talkList, setTalkList] = useRecoilState(talkListState)
  const [columnList, setColumnList] = useRecoilState(columnListState)

  const [selectedIndex, setSelectedIndex] = useState<number | undefined>()
  const [talkFile, setTalkFile] = useState<TalkFile | undefined>(undefined)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const handleListItemClick = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index)

    const id = talkList[index].id

    const setData = async () => {
      const textObject = await loadTextFileInDataDir(`${id}.json`)
      const result: TalkFile = textObject as TalkFile
      setTalkFile(result)
    }
    setData()
  }

  const checkEnableColumn = (talkId: string): boolean => {
    return columnList.includes(talkId)
  }

  const handleCheck = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    let newColumns: string[]

    if (event.target.checked) {
      newColumns = [id, ...columnList]
    } else {
      newColumns = columnList.filter((columnId) => columnId !== id)
    }

    setColumnList(newColumns)
    await saveTextFileInDataDir('columnList.json', JSON.stringify(newColumns))
  }

  const handleDelete = async (id: string) => {
    const deletedColumnList = columnList.filter((columnId) => columnId !== id)
    setColumnList(deletedColumnList)
    await saveTextFileInDataDir(
      'ColumnList.json',
      JSON.stringify(deletedColumnList)
    )

    const deletedTalkList = talkList.filter((talk) => talk.id !== id)
    setTalkList(deletedTalkList)
    await saveTextFileInDataDir(
      'TalkList.json',
      JSON.stringify(deletedTalkList)
    )

    await deleteFileInDataDir(`${id}.json`)

    setSelectedIndex(undefined)
    setAnchorEl(null)
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
        {talkList.map((talk, index) => {
          return (
            <ListItem
              id={`conversation-list-${index}`}
              disablePadding
              sx={{ height: '2rem' }}
            >
              <ListItemButton
                role={undefined}
                dense
                sx={{ height: '2rem' }}
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemText primary={talk.name} />
                <ListItemIcon
                  sx={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Checkbox
                    checked={checkEnableColumn(talk.id)}
                    onChange={(event) => handleCheck(event, talk.id)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': index.toString() }}
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
                  <MenuItem onClick={async () => handleDelete(talk.id)}>
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
        {selectedIndex !== undefined && (
          <Body talkFile={talkFile} isPreview={true} />
        )}
      </Box>
    </Box>
  )
}

export default EditColumnsMenu
