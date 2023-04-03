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
import { Box, FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import Send from '@mui/icons-material/Send'

// Utils
import { loadPrompt, saveTalks } from '../utils/files'

// Libraries
import { Configuration, OpenAIApi } from 'openai'

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
    height: '8rem'
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

            const sendingAll: any = [...props.talks, {role: "user", content: inputVal}]
            props.setTalks(sendingAll)
            setInputValue('')
            setTimeout(() => {
                if (props.scrollRef.current) {
                    const element = props.scrollRef.current.lastElementChild as HTMLElement
                    element.scrollIntoView({ behavior: 'smooth', block: 'end' })
                }
            }, 0)

            const apiKey = settings.ApiKey
            if (!apiKey) return

            const configuration = new Configuration({apiKey})
            const openai = new OpenAIApi(configuration)

            try {
                const response = await openai.createChatCompletion({
                    model: 'gpt-3.5-turbo-0301',
                    messages: [{ role: "system", content: promptText }, ...sendingAll]
                })
            
                const res = response.data.choices[0].message

                const allContent = [...sendingAll, res]
                
                props.setTalks(allContent)
                setTimeout(() => {
                    if (props.scrollRef.current) {
                        const element = props.scrollRef.current.lastElementChild as HTMLElement
                        element.scrollIntoView({ behavior: 'smooth', block: 'end' })
                    }
                }, 0)
    
                await saveTalks(allContent, talkRoom)

            } catch (err) {
        
                return {
                    "role" : "assistant",
                    "content" : "エラーです"
                }
            }


        })
    }

    return (
        <Box sx={style}>
            <FormControl variant="outlined" sx={{ marginLeft: '2rem', width: '93%' }}>
                <OutlinedInput
                    id="text-input"
                    value={inputVal}
                    multiline
                    fullWidth
                    rows={5}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setInputValue(event.target.value);
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            onClick={sending}
                            edge="end"
                            >
                                <Send />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Box>
	)
}

export default Footer