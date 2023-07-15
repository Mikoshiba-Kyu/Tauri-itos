import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'
import Header from './Header'
import Body from './Body'
import { TalkFile } from '../../types/types'
import { loadTalkFile } from '../../utils/files'
import { Rnd, RndResizeCallback } from 'react-rnd'
import InputBox from './InputBox'

interface Props {
  id: string
}

const style = {
  borderRightWidth: '4px',
  borderRightStyle: 'solid',
  borderRightColor: '#464646',
}

const resizeHandleClasses = {
  right: 'right-resize-handle',
}

const Pane = (props: Props) => {
  const { id } = props

  const [talkFile, setTalkFile] = useState<TalkFile | undefined>(undefined)
  const [leftBoxWidth, setLeftBoxWidth] = useState<string | number>(400)

  const handleResize: RndResizeCallback = (_, __, elementRef) => {
    const newWidth: string = elementRef.style.width
    setLeftBoxWidth(newWidth)
  }
  // レンダリング時に対応するIDのトークファイルからデータを取得する
  useEffect(() => {
    const setData = async () => {
      const result: TalkFile = await loadTalkFile(id)
      setTalkFile(result)
    }
    setData()
  }, [])

  if (!talkFile) return null

  return (
    <Box sx={style}>
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: leftBoxWidth,
          height: '100%',
        }}
        minWidth={200}
        maxWidth={800}
        enableResizing={{
          top: false,
          right: true,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
        dragHandleClassName="drag-handle"
        resizeHandleClasses={resizeHandleClasses}
        onResize={handleResize}
        style={{ position: 'inherit' }}
      >
        <Header talkFile={talkFile}></Header>
        <InputBox talkFile={talkFile} setTalkFile={setTalkFile} />
        <Body talkFile={talkFile}></Body>
      </Rnd>
    </Box>
  )
}

export default Pane
