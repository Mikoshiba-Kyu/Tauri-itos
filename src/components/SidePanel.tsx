/**
 * ---------------------- Dev Settings ----------------------
 */
const isLogging = true
const moduleName = 'SidePanel.tsx'

/**
 * ---------------------- Import ----------------------
 */

// React
import { useState } from 'react'

// MUI
import { Box, Button, Drawer, Modal, Typography } from '@mui/material'

// Components
import TalkRoomList from './TalkRoomList'
import SideFooter from './SideFooter'
import NewTalkModal from './NewTalkModal'

/**
 * ---------------------- Contents ----------------------
 */
const SidePanel = () => {
    isLogging && console.log(`[App] [${moduleName}] Render.`)

    const drawerWidth = 260

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <Box component="nav"
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
                    <Button variant="outlined" disableElevation onClick={handleOpen} sx={{ margin: '1rem'}}>
                        新しい会話
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <NewTalkModal />
                    </Modal>
                    <TalkRoomList />
                </Box>

                <SideFooter/>
            </Drawer>
        </ Box>
	)
}

export default SidePanel