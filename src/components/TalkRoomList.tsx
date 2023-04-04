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
import { talkDataState } from '../atoms/talkDataState'

// MUI
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material'

// Utils
import { getTalkFile } from '../utils/files'

/**
 * ---------------------- Contents ----------------------
 */
const TalkRoomList = () => {
    isLogging && console.log(`[App] [${moduleName}] Render.`)

    const talkRoomList = useRecoilValue(talkRoomNames)
    const [talkRoom, setTalkRoom] = useRecoilState(selectTalkRoom)
    const [talkData, setTalkData ] = useRecoilState(talkDataState)

    const roomList = talkRoomList.map((item, index) => (
        <ListItem disablePadding>
            <ListItemButton onClick={(event) => listClicked(event)}>
                <ListItemText primary={item} />
            </ListItemButton>
        </ListItem>
    ))

    const listClicked = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setTalkRoom(event.currentTarget.innerText)
        setTalkData(await getTalkFile(event.currentTarget.innerText))
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