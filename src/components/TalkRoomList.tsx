/**
 * ---------------------- Dev Settings ----------------------
 */
const isLogging = true
const moduleName = 'TalkRoomList.tsx'

/**
 * ---------------------- Import ----------------------
 */

// React
import { useRecoilValue, useRecoilState } from 'recoil'
import { talkRoomNames } from '../atoms/talkRoomNames'
import { selectTalkRoom } from '../atoms/selectTalkRoom'

// MUI
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material'

// Utils
import { getTalkFile } from '../utils/files'

/**
 * ---------------------- Props ----------------------
 */
export interface Props {
    setTalks: Function
}

/**
 * ---------------------- Contents ----------------------
 */
const TalkRoomList = (props: Props) => {
    isLogging && console.log(`[App] [${moduleName}] Render.`)

    const talkRoomList = useRecoilValue(talkRoomNames)
    const [talkRoom, setTalkRoom] = useRecoilState(selectTalkRoom)

    const roomList = talkRoomList.map((item, index) => (
        <ListItem disablePadding>
            <ListItemButton onClick={(event) => listClicked(event)}>
                <ListItemText primary={item} />
            </ListItemButton>
        </ListItem>
    ))

    const listClicked = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setTalkRoom(event.currentTarget.innerText)
        await props.setTalks(await getTalkFile(event.currentTarget.innerText))
    }

    return (
        <Box>
            <List dense>
                {roomList}
            </List>
        </ Box>
	)
}

export default TalkRoomList