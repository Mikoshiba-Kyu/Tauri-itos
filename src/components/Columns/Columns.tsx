import { useRecoilValue } from 'recoil'
import { talkListState } from '../../atoms/talkList'
import { columnsState } from '../../atoms/columnsState'
import Pane from '../ColumnPane/Pane'
import { Box } from '@mui/material'

const Columns = () => {
  const columns = useRecoilValue(columnsState)
  const talkList = useRecoilValue(talkListState)

  const availableTalkList = columns.map((column) => {
    return talkList.find((talk) => talk.id === column)
  })

  if (!availableTalkList) return null

  return (
    <Box
      display={'flex'}
      width={'100%'}
      height={'100vh'}
      sx={{ overflowX: 'auto' }}
    >
      {availableTalkList.map((item) => {
        return item && <Pane id={item.id} name={item.name}></Pane>
      })}
    </Box>
  )
}
export default Columns
