import { useRecoilValue } from 'recoil'
import { talkListState } from '../../atoms/talkList'
import { columnListState } from '../../atoms/columnList'
import Pane from '../ColumnPane/Pane'
import { Box } from '@mui/material'
import BlankContents from '../UI/BlankContents'
import { t, use } from 'i18next'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

const TimeLine = () => {
  const columnList = useRecoilValue(columnListState)
  const talkList = useRecoilValue(talkListState)

  const [viewedColumns, setViewedColumns] = useState<any>([])

  useEffect(() => {
    const result = columnList.map((column) => {
      return talkList.find((talk) => talk.id === column)
    })
    setViewedColumns(result)
  }, [columnList])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      return
    }

    if (active.id !== over.id) {
      const oldIndex = viewedColumns.findIndex(
        (v: { id: string; name: string }) => v.id === active.id
      )
      const newIndex = viewedColumns.findIndex(
        (v: { id: string; name: string }) => v.id === over.id
      )
      setViewedColumns(arrayMove(viewedColumns, oldIndex, newIndex))
    }
  }

  return (
    <Box
      display={'flex'}
      width={'100%'}
      height={'100vh'}
      sx={{ overflowX: 'auto' }}
    >
      {!viewedColumns || viewedColumns.length === 0 ? (
        <BlankContents message={t('timeline.noTimeline')} />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={viewedColumns}
            strategy={horizontalListSortingStrategy}
          >
            {viewedColumns.map(
              (item: { id: string; name: string }) =>
                item && <Pane id={item.id}></Pane>
            )}
          </SortableContext>
        </DndContext>
      )}
    </Box>
  )
}
export default TimeLine
