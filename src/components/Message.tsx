/**
 * ---------------------- Dev Settings ----------------------
 */
const isLogging = true
const moduleName = 'Message.tsx'

/**
 * ---------------------- Import ----------------------
 */

// React
import { useEffect } from 'react'

// MUI
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { useRecoilState } from 'recoil'
import { selectTalkRoom } from '../atoms/selectTalkRoom'
import { selectAvatarFile } from '../atoms/selectAvatarFile'

// Tauri
import { convertFileSrc } from '@tauri-apps/api/tauri'

// Utils
import { getAvatarPath } from '../utils/files'

// Types
import { Talks } from '../types/types'


/**
 * ---------------------- Props ----------------------
 */
export interface Props {
    talks: Talks,
    scrollRef: React.RefObject<HTMLDivElement>
}

/**
 * ---------------------- Styles ----------------------
 */
const style: object = {
    width: '100%',
    height: 'calc(100vh - 12rem)',
    overflowY: 'auto'
} 

const userCardStyle: object = {
    maxWidth: '50%',
    marginLeft: '2rem',
    marginRight: '2rem',
    marginTop: '2rem',
    backgroundColor: '#323835'
}

const assistantCardStyle: object = {
    maxWidth: '50%',
    marginLeft: '2rem',
    marginRight: '2rem',
    marginTop: '2rem',
    margin: '2rem',
    backgroundColor: '#1e424f'
}

/**
 * ---------------------- Contents ----------------------
 */
const Message = (props: Props) => {
    isLogging && console.log(`[App] [${moduleName}] Render.`)

    const [selectAvatar, setSelectAvatar] = useRecoilState(selectAvatarFile)
    const [talkRoom] = useRecoilState(selectTalkRoom)

    useEffect(() => {
        const getPath = async () => {
            setSelectAvatar(await getAvatarPath(talkRoom))
        }
        getPath()
    }, [talkRoom])

    const messageItems = props.talks.map((item, index) => (
        <Grid container justifyContent={item.role === 'user' ? "flex-start": "flex-end"} alignItems="center">

            <Card sx={item.role === 'user' ? userCardStyle: assistantCardStyle}>
                <CardContent>
                    {item.content.split('\n').map((line, i) => (
                        <Typography key={`${index}-${i}`} variant="body1" component="p" sx={{ whiteSpace: 'pre-line' }}>
                        {line}
                        </Typography>
                    ))}
                </CardContent>
            </Card>
            
            { item.role !== 'user' && (
                <Card sx={{ width: '80px', height: '80px', marginRight: '2rem', borderRadius: '0.4rem' }}>
                    <CardMedia
                        image={convertFileSrc(selectAvatar)}
                        title="avatar"
                        sx={{ height: '80px' }}
                    />
                </Card>
            )}
            
        </Grid>
    ))

    return (
        <Box ref={props.scrollRef} sx={style}>
            {messageItems}
        </ Box>
	)
}

export default Message