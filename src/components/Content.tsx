/**
 * ---------------------- Dev Settings ----------------------
 */
const isLogging = true
const moduleName = 'Content.tsx'

/**
 * ---------------------- Import ----------------------
 */

// React
import { useRecoilValue } from 'recoil'
import { selectTalkRoom } from '../atoms/selectTalkRoom'
import { useRef } from 'react'

// MUI
import { Box } from '@mui/material'

// Components
import Footer from './Footer'
import Message from './Message'

// Types
import { Talks } from '../types/types'

/**
 * ---------------------- Props ----------------------
 */
export interface Props {
    talks: Talks
    setTalks: Function
}

/**
 * ---------------------- Styles ----------------------
 */
const style: object = {
    width: '100%',
    height: '100vh'
} 


/**
 * ---------------------- Contents ----------------------
 */
const Content = (props: Props) => {
    isLogging && console.log(`[App] [${moduleName}] Render.`)

    const talkRoom = useRecoilValue(selectTalkRoom)

    const scrollRef = useRef<HTMLDivElement>(null);

    if (talkRoom === '') {
        return (
            <>
            </>
        )
    } else {
        return (
            <Box sx={style}>
                <Message talks={props.talks} scrollRef={scrollRef}></Message>
                <Footer talks={props.talks} setTalks={props.setTalks} scrollRef={scrollRef}/>
            </ Box>
        )
    }
}

export default Content

