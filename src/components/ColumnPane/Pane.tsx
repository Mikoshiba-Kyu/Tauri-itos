import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'
import Header from './Header'
import Body from './Body'
import { TalkFile } from '../../types/types'
import { loadTextFileInDataDir } from '../../utils/files'
import { Rnd, RndResizeCallback } from 'react-rnd'
import InputBox from './InputBox'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export interface Props {
  id: string
}

const style = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRightWidth: '4px',
  borderRightStyle: 'solid',
  borderRightColor: 'timelineBorder.primary',
}

const resizeHandleClasses = {
  right: 'right-resize-handle',
}

const Pane = (props: Props) => {
  const { id } = props
  const scrollRef = useRef<HTMLDivElement>(null)
  const [talkFile, setTalkFile] = useState<TalkFile | undefined>(undefined)
  const [leftBoxWidth, setLeftBoxWidth] = useState<string | number>(400)
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id })

  const dragstyle = {
    transform: CSS.Transform.toString(transform),
  }
  const handleResize: RndResizeCallback = (_, __, elementRef) => {
    const newWidth: string = elementRef.style.width
    setLeftBoxWidth(newWidth)
  }
  // レンダリング時に対応するIDのトークファイルからデータを取得する
  useEffect(() => {
    const setData = async () => {
      const textObject = await loadTextFileInDataDir(`${id}.json`)
      const result: TalkFile = textObject as TalkFile
      setTalkFile(result)
    }
    setData()
  }, [id])

  if (!talkFile) return null

  return (
    <Box ref={setNodeRef} sx={dragstyle} {...attributes}>
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
        <Box sx={style}>
          <Header talkFile={talkFile} listeners={listeners}></Header>
          <InputBox
            talkFile={talkFile}
            setTalkFile={setTalkFile}
            scrollRef={scrollRef}
            isAccordionOpen={isAccordionOpen}
            setIsAccordionOpen={setIsAccordionOpen}
          />
          <Body talkFile={talkFile} scrollRef={scrollRef}></Body>
        </Box>
      </Rnd>
    </Box>
  )
}

export default Pane
