/**
 * ---------------------- Import ----------------------
 */

// MUI
import { Box, Typography } from '@mui/material'

const style = {
  height: '68px',
  padding: '1rem',
  borderBottom: '1px solid gray',
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
