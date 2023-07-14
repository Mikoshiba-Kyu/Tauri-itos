/**
 * ---------------------- Import ----------------------
 */

// MUI
import { Box, Typography } from '@mui/material'

const style = {
  height: 'var(--column-header-height)',
  width: '100%',
  padding: '1rem',
}

interface Props {
  id: string
  name: string
}

const Header = (props: Props) => {
  const { id, name } = props

  return (
    <Box sx={style}>
      <Typography variant={'h6'}>{name}</Typography>
    </Box>
  )
}

export default Header
