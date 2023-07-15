import { Box, Typography } from '@mui/material'
import { TalkFile } from '../../types/types'

const style = {
  height: 'var(--column-header-height)',
  width: '100%',
  padding: '1rem',
}

interface Props {
  talkFile?: TalkFile
}

const Header = (props: Props) => {
  const { talkFile } = props

  if (!talkFile) return null

  return (
    <Box sx={style}>
      <Typography variant={'h6'}>{talkFile.name}</Typography>
    </Box>
  )
}

export default Header
