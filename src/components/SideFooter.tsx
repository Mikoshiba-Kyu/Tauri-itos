/**
 * ---------------------- Dev Settings ----------------------
 */
const isLogging = true
const moduleName = 'SideFooter.tsx'

/**
 * ---------------------- Import ----------------------
 */

// React
import { useState } from 'react'

// MUI
import { Box, IconButton, Modal } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'

// Components
import SettingsModal from './SettingsModal'

/**
 * ---------------------- Props ----------------------
 */
export interface Props {

}

/**
 * ---------------------- Styles ----------------------
 */
const style: object = {
    width: '100%',
    height: '2.5rem',
} 

/**
 * ---------------------- Contents ----------------------
 */
const SideFooter = (props: Props) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <Box sx={style}>
            <IconButton aria-label="delete">
                <SettingsIcon fontSize="small" onClick={handleOpen} />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <SettingsModal />
                </Modal>
            </IconButton>
        </Box>
	)
}

export default SideFooter