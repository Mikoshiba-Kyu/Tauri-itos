/**
 * ---------------------- Dev Settings ----------------------
 */
const isLogging = true
const moduleName = 'SidePanel.tsx'

/**
 * ---------------------- Import ----------------------
 */

// React
import { useRecoilState } from 'recoil'
import { selectTalkRoom } from '../atoms/selectTalkRoom'

// MUI
import { Box, Button, Drawer } from '@mui/material'

// Components
import TalkRoomList from './TalkRoomList'

// Utils
import { getTalkFile } from '../utils/files'

// Types
import { Talks } from '../types/types'

/**
 * ---------------------- Props ----------------------
 */
export interface Props {
	isOpenPanel: boolean
    setOpenPanel: Function
    talks: Talks
    setTalks: Function
}

/**
 * ---------------------- Contents ----------------------
 */
const SidePanel = (props: Props) => {
    isLogging && console.log(`[App] [${moduleName}] Render.`)

    const drawerWidth = 260

    const [talkRoom, setTalkRoom] = useRecoilState(selectTalkRoom)

    const newTalk = async () => {
        const talkRoomName = talkRoom === '' ? 'ルフィ': ''
        setTalkRoom(talkRoomName)
        await props.setTalks(await getTalkFile(talkRoomName))
    }

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
                <Button variant="outlined" disableElevation onClick={newTalk} sx={{ margin: '1rem'}}>
                    新しい会話
                </Button>
                <TalkRoomList setTalks={props.setTalks}/>
            </Drawer>
        </ Box>
	)
}

export default SidePanel