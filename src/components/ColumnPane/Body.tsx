import { Box, Typography } from '@mui/material'
import { TalkData } from '../../types/types'

interface Props {
  talkData: TalkData
}

const style = {
  height: 'calc(100vh - 68px)',
  width: '36rem',
  overflowY: 'auto',
}

const cardStyle = {
  padding: '1rem',
  borderBottom: '1px solid darkgray',
}

const Body = (props: Props) => {
  const { talkData } = props

  return (
    <Box sx={style}>
      {talkData.map((item) => {
        return (
          <Box sx={cardStyle}>
            <Typography variant="body2">{item.content}</Typography>
          </Box>
        )
      })}
    </Box>
  )
}
export default Body
