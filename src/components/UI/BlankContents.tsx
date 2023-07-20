import { Box, Grid, Typography } from '@mui/material'
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined'

interface Props {
  message: string
  height: string | number
}

const style = {
  width: '100%',
}

const BlankContents = (props: Props) => {
  const { message, height } = props

  return (
    <Box
      display={'flex'}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{ ...style, height }}
    >
      <SmsOutlinedIcon
        sx={{
          fontSize: '8rem',
          color: 'grey.600',
        }}
      />
      <Typography color={'grey.600'}>{message}</Typography>
    </Box>
  )
}

export default BlankContents
