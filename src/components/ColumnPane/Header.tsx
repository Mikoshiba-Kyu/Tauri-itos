import { Box, Grid, Typography } from '@mui/material'
import { TalkFile } from '../../types/types'

export interface Props {
  talkFile?: TalkFile
}

const style = {
  height: 'var(--column-header-height)',
  width: '100%',
  padding: '1rem',
}

const Header = (props: Props) => {
  const { talkFile } = props

  if (!talkFile) return null

  const getTotalTokenCount = () => {
    const keys = Object.keys(talkFile.talks)
    const lastKey: any = keys[keys.length - 1]
    return talkFile.talks[lastKey].totalTokens
  }

  return (
    <Box sx={style}>
      <Typography variant={'h6'} sx={{ color: 'timelineHeaderText.primary' }}>
        {talkFile.name}
      </Typography>
      <Grid container direction="row" justifyContent="flex-end">
        <Typography variant="caption" sx={{ color: 'timelineText.secondary' }}>
          {`Total Tokens : ${getTotalTokenCount() ?? '-'}`}
        </Typography>
      </Grid>
    </Box>
  )
}

export default Header
