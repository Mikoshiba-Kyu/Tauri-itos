import { Box, Typography, Grid } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import { TalkFile } from '../../types/types'

interface Props {
  talkFile?: TalkFile
}

const style = {
  height:
    'calc(100vh - var(--column-header-height) - var(--column-close-input-height) - 8px)', // TODO: 8pxはどこから生まれるのか
  width: '100%',
  overflowY: 'auto',
}

const cardStyle = {
  width: '100%',
  padding: '1rem',
  borderBottom: '1px solid #343434',
}

const Body = (props: Props) => {
  const { talkFile } = props

  if (!talkFile) return null

  return (
    <Box sx={style}>
      {talkFile.talks.map((talk, i) => {
        return (
          <Box key={i} sx={cardStyle}>
            <Grid container>
              <Grid sx={{ width: '48px' }}>
                {talk.role === 'user' ? <PersonIcon /> : <AcUnitIcon />}
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
