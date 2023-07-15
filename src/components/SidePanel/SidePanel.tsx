import { useState } from 'react'
import { Box, Button, Drawer, Modal, Typography } from '@mui/material'
import TalkRoomList from '../TalkRoomList'
import SideFooter from './SideFooter'
import NewTalkModal from './NewTalkModal'

const drawerWidth = 260

const SidePanel = () => {
  const [newTalkOpen, setNewTalkOpen] = useState<boolean>(false)
  const handleNewTalkOpen = () => setNewTalkOpen(true)
  const handleNewTalkClose = () => setNewTalkOpen(false)

  const handleNewTalk = () => {}

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        <Box sx={{ height: 'calc(100vh - 2.5rem)' }}>
          <Button variant={'outlined'} onClick={handleNewTalkOpen}>
            New Talk
          </Button>
          <Modal open={newTalkOpen} onClose={handleNewTalkClose}>
            <NewTalkModal />
          </Modal>
          <TalkRoomList />
        </Box>

        <SideFooter />
      </Drawer>
    </Box>
  )
}

export default SidePanel
