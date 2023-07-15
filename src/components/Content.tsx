import { useRecoilValue } from 'recoil'
import { selectTalkRoom } from '../atoms/selectTalkRoom'
import { useRef } from 'react'
import { Box } from '@mui/material'
import Footer from './Footer'
import Message from './Message'

const style: object = {
  width: '100%',
  height: '100vh',
}

const Content = () => {
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
