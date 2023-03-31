/**
 * ---------------------- Dev Settings ----------------------
 */
const isLogging = true
const moduleName = 'Footer.tsx'

/**
 * ---------------------- Import ----------------------
 */

// React
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { settingsState } from '../atoms/settingsState'
import { selectTalkRoom } from '../atoms/selectTalkRoom'
import { flushSync } from 'react-dom'

// MUI
import { Box, Button, TextField } from '@mui/material'

// Utils
import { send } from '../utils/api'
import { loadPrompt, saveTalks } from '../utils/files'

// Types
import { Talks } from '../types/types'

/**
 * ---------------------- Props ----------------------
 */
export interface Props {
    talks: Talks,
    setTalks: Function
    scrollRef: React.RefObject<HTMLDivElement>
}

/**
 * ---------------------- Styles ----------------------
 */
const style: object = {
    width: '100%',
    height: '12rem',
    //background: 'linear-gradient(180deg, rgba(18,18,18,0.5) 0%, rgba(18,18,18,1) 40%)'
} 

/**
 * ---------------------- Contents ----------------------
 */
const Footer = (props: Props) => {

    const settings = useRecoilValue(settingsState)
    const talkRoom = useRecoilValue(selectTalkRoom)

    const [inputVal, setInputValue] = useState('')

    const sending = async () => {

        if (inputVal === '') return

        flushSync(async() => {

            const promptText = await loadPrompt(talkRoom)

            const sendingAll = [...props.talks, {role: "user", content: inputVal}]
            props.setTalks(sendingAll)
            setInputValue('')
            setTimeout(() => {
                if (props.scrollRef.current) {
                    const element = props.scrollRef.current.lastElementChild as HTMLElement
                    element.scrollIntoView({ behavior: 'smooth', block: 'end' })
                }
            }, 0)

            const res = await send(settings.ApiKey!, promptText, sendingAll)
            const allContent = [...sendingAll, res]
            props.setTalks(allContent)
            setTimeout(() => {
                if (props.scrollRef.current) {
                    const element = props.scrollRef.current.lastElementChild as HTMLElement
                    element.scrollIntoView({ behavior: 'smooth', block: 'end' })
                }
            }, 0)

            await saveTalks(allContent, talkRoom)
        })
    }

    return (
        <Box sx={style}>
            <TextField 
                id="outlined-multiline-static"
                value={inputVal}
                multiline
                rows={4}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setInputValue(event.target.value);
                }}
                sx={{ width: '70%', margin: '2rem'}}
            />
            <Button variant="outlined" disableElevation onClick={sending} sx={{ marginTop: '2rem'}}>
                送信
            </Button>
        </Box>
	)
}

export default Footer