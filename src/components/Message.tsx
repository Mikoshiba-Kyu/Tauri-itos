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
import { useRecoilValue, useRecoilState } from 'recoil'
import { settingsState } from '../atoms/settingsState'
import { selectTalkRoom } from '../atoms/selectTalkRoom'
import { talkDataState } from '../atoms/talkDataState'
import { selectAvatarFile } from '../atoms/selectAvatarFile'

// MUI
import { Box, Card, CardContent, CardMedia, Grid } from '@mui/material'

// Tauri
import { convertFileSrc } from '@tauri-apps/api/tauri'

// Utils
import { getAvatarPath } from '../utils/files'

// Libraries
import { marked } from "marked"

/**
 * ---------------------- Props ----------------------
 */
export interface Props {
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
    maxWidth: '40%',
    minWidth: '30%',
    marginLeft: '2rem',
    marginRight: '2rem',
    marginTop: '1rem',
    marginBottom: '1rem'
}

const assistantCardStyle: object = {
    maxWidth: '40%',
    minWidth: '30%',
    marginLeft: '2rem',
    marginRight: '2rem',
    marginTop: '1rem',
    marginBottom: '1rem'
}

/**
 * ---------------------- Contents ----------------------
 */
const Message = (props: Props) => {
    isLogging && console.log(`[App] [${moduleName}] Render.`)

    const [selectAvatar, setSelectAvatar] = useRecoilState(selectAvatarFile)

    const talkRoom = useRecoilValue(selectTalkRoom)
    const talkData = useRecoilValue(talkDataState)
    const settings = useRecoilValue(settingsState)

    // talkRoom 変更時に対応するAvatar画像ファイルのパスを変更する
    useEffect(() => {
        const getPath = async () => {
            setSelectAvatar(await getAvatarPath(talkRoom))
        }
        getPath()
    }, [talkRoom])

    const messageItems = talkData.map((item, index) => (

        <Grid container justifyContent={item.role === 'user' ? "flex-start": "flex-end"} alignItems="center">

            <Card sx={item.role === 'user'
                ? {...userCardStyle, backgroundColor: settings.Theme === 'light' ? '#afdcc8' : '#323835'}
                : {...assistantCardStyle, backgroundColor: settings.Theme === 'light' ? '#e9cad1' : '#1e424f' }}>

                <CardContent>
                    <span dangerouslySetInnerHTML={{ __html : marked.parse(item.content)}} />
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