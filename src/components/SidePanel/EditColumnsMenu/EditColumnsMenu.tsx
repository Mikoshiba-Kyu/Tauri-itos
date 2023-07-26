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
} from '@mui/material'
import { useRecoilState } from 'recoil'
import { talkListState } from '../../../atoms/talkList'
import { columnListState } from '../../../atoms/columnList'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Spacer } from '../../UI/Spacer'
import { saveTextFileInDataDir } from '../../../utils/files'
import { t } from 'i18next'
import { TalkFile } from '../../../types/types'
import { loadTextFileInDataDir } from '../../../utils/files'
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
            <ListItem disablePadding sx={{ height: '2rem' }}>
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
                <MoreVertIcon />
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
        {selectedIndex && <Body talkFile={talkFile} isPreview={true} />}
      </Box>
    </Box>
  )
}

export default EditColumnsMenu
