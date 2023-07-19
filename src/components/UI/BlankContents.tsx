import { Box, Grid, Typography } from '@mui/material'
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined'

interface Props {
  message: string
}

const style = {
  width: '100%',
  height:
    'calc(100vh - var(--column-header-height) - var(--column-close-input-height) - 8px)', // TODO: 8pxはどこから生まれるのか,
}

const BlankContents = (props: Props) => {
  const { message } = props

  return (
    <Box
      display={'flex'}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={style}
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
