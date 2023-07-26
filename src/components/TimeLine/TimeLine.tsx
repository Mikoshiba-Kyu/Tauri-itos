import { useRecoilValue } from 'recoil'
import { talkListState } from '../../atoms/talkList'
import { columnListState } from '../../atoms/columnList'
import Pane from '../ColumnPane/Pane'
import { Box } from '@mui/material'
import BlankContents from '../UI/BlankContents'
import { t } from 'i18next'

const TimeLine = () => {
  const columnList = useRecoilValue(columnListState)
  const talkList = useRecoilValue(talkListState)

  const availableTalkList = columnList.map((column) => {
    return talkList.find((talk) => talk.id === column)
  })

  if (!availableTalkList || availableTalkList.length === 0) {
    return <BlankContents message={t('timeline.noTimeline')} />
  }

  return (
    <Box
      display={'flex'}
      width={'100%'}
      height={'100vh'}
      sx={{ overflowX: 'auto' }}
    >
      {availableTalkList.map((item) => {
        return item && <Pane id={item.id}></Pane>
      })}
    </Box>
  )
}
export default TimeLine
