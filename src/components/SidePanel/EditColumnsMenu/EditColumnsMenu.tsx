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
import { useState } from 'react'
import { Spacer } from '../../UI/Spacer'

const style = {
  width: '100%',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  overflowY: 'auto',
}

const listStyle = {
  border: '1px solid',
  borderColor: 'timelineBorder.primary',
}

const EditColumnsMenu = () => {
  const [talkList, setTalkList] = useRecoilState(talkListState)
  const [columnList, setColumnList] = useRecoilState(columnListState)

  const [selectedIndex, setSelectedIndex] = useState<number | undefined>()

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index)
  }

  const checkEnableColumn = (talkId: string): boolean => {
    return columnList.includes(talkId)
  }

  return (
    <Box sx={style}>
      <FormLabel>
        <Typography variant="caption">会話の一覧</Typography>
      </FormLabel>
      <List sx={listStyle}>
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
        <Typography variant="caption">会話のプレビュー</Typography>
      </FormLabel>

      <Box sx={{ flexGrow: 1, border: '1px solid white' }}>koko</Box>
    </Box>
  )
}

export default EditColumnsMenu
