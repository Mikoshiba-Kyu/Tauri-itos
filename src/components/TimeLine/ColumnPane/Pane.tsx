import { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { timelineState } from '../../../atoms/timelineState'
import { Box } from '@mui/material'
import Header from './Header'
import Body from './Body'
import { ConversationFile, Timeline, TimelineData } from '../../../types/types'
import {
  loadTextFileInDataDir,
  saveTextFileInDataDir,
} from '../../../utils/files'
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

  const [timeline, setTimeline] = useRecoilState(timelineState)

  const [conversationFile, setConversationFile] = useState<
    ConversationFile | undefined
  >(undefined)
  const [columnWidth, setColumnWidth] = useState<string>(
    timeline.find((timelineData: TimelineData) => timelineData.id === id)!
      .columnWidth
  )
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const [isProgress, setIsProgress] = useState(false)

  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: id,
  })

  const dragstyle = {
    transform: CSS.Transform.toString(transform),
  }

  const handleResize: RndResizeCallback = async (_, __, elementRef) => {
    const newWidth: string = elementRef.style.width
    setColumnWidth(newWidth)

    const newTimeline: Timeline = timeline.map((timelineData: TimelineData) => {
      if (timelineData.id === id) {
        return { ...timelineData, columnWidth: newWidth }
      } else {
        return timelineData
      }
    })
    setTimeline(newTimeline)
  }

  // レンダリング時に対応するIDのトークファイルからデータを取得する
  useEffect(() => {
    const setData = async () => {
      const textObject = await loadTextFileInDataDir(`${id}.json`)
      const result: ConversationFile = textObject as ConversationFile
      setConversationFile(result)
    }
    setData()
  }, [id])

  // debounce で columnWidth をファイルに保存する
  useEffect(() => {
    const timer = setTimeout(async () => {
      const newTimeline: Timeline = timeline.map(
        (timelineData: TimelineData) => {
          if (timelineData.id === id) {
            return { ...timelineData, columnWidth: columnWidth }
          } else {
            return timelineData
          }
        }
      )
      await saveTextFileInDataDir(
        'Timeline.json',
        JSON.stringify(newTimeline, null, 2)
      )
    }, 500)
    return () => clearTimeout(timer)
  }, [columnWidth])

  if (!conversationFile) return null

  return (
    <Box ref={setNodeRef} sx={dragstyle} {...attributes}>
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: columnWidth,
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
          <Header
            conversationFile={conversationFile}
            setConversationFile={setConversationFile}
            listeners={listeners}
            columnWidth={columnWidth}
          ></Header>
          <InputBox
            conversationFile={conversationFile}
            setConversationFile={setConversationFile}
            scrollRef={scrollRef}
            isAccordionOpen={isAccordionOpen}
            setIsAccordionOpen={setIsAccordionOpen}
            setIsProgress={setIsProgress}
          />
          <Body
            conversationFile={conversationFile}
            scrollRef={scrollRef}
            isProgress={isProgress}
          ></Body>
        </Box>
      </Rnd>
    </Box>
  )
}

export default Pane
