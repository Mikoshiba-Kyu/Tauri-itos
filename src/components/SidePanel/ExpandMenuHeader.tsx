import { Box, Typography, Grid, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
  title: string
  setExpandMenu: (value: string) => void
}

const style: object = {
  width: '100%',
  height: '--expand-menu-header-height',
  padding: '1rem',
}

const ExpandMenuHeader = (props: Props) => {
  const { title, setExpandMenu } = props

  return (
    <Box sx={style}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={() => setExpandMenu('')}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Grid>
    </Box>
  )
}

export default ExpandMenuHeader
