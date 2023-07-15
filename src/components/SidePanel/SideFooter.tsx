import { useState } from 'react'
import { Box, IconButton, Modal } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import SettingsModal from './SettingsModal'

const style: object = {
  width: '100%',
  height: '2.5rem',
}

const SideFooter = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box sx={style}>
      <IconButton aria-label="delete">
        <SettingsIcon fontSize="small" onClick={handleOpen} />
        <Modal open={open} onClose={handleClose}>
          <SettingsModal />
        </Modal>
      </IconButton>
    </Box>
  )
}

export default SideFooter
