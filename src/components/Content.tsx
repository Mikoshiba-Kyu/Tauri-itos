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

/**
 * ---------------------- Styles ----------------------
 */
const style: object = {
  width: '100%',
  height: '100vh',
}

/**
 * ---------------------- Contents ----------------------
 */
const Content = () => {
  isLogging && console.log(`[App] [${moduleName}] Render.`)

  const talkRoom = useRecoilValue(selectTalkRoom)

  const scrollRef = useRef<HTMLDivElement>(null)

  if (talkRoom === '') {
    return <></>
  } else {
    return (
      <Box sx={style}>
        <Message scrollRef={scrollRef}></Message>
        <Footer scrollRef={scrollRef} />
      </Box>
    )
  }
}

export default Content
