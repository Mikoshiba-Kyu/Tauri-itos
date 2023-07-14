import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'
import Header from './Header'
import Body from './Body'
import { TalkData } from '../../types/types'
import { getTalkFile } from '../../utils/files'
import { Rnd, RndResizeCallback } from 'react-rnd'
import InputBox from './InputBox'

interface Props {
  id: string
  name: string
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
  const { id, name } = props

  const [talkData, setTalkData] = useState<TalkData>([])
  const [leftBoxWidth, setLeftBoxWidth] = useState<string | number>(400)

  const handleResize: RndResizeCallback = (_, __, elementRef) => {
    const newWidth: string = elementRef.style.width
    setLeftBoxWidth(newWidth)
  }
  // レンダリング時に対応するIDのトークファイルからデータを取得する
  useEffect(() => {
    const setData = async () => {
      const result = await getTalkFile(id)
      setTalkData(result)
    }
    setData()
  }, [])

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
        <Header id={id} name={name}></Header>
        <InputBox />
        <Body talkData={talkData}></Body>
      </Rnd>
    </Box>
  )
}

export default Pane
