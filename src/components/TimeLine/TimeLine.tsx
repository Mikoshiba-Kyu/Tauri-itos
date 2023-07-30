import { useRecoilState } from 'recoil'
import { timelineState } from '../../atoms/timelineState'
import Pane from './ColumnPane/Pane'
import { Box } from '@mui/material'
import BlankContents from '../UI/BlankContents'
import { t } from 'i18next'
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
import { TimelineData } from '../../types/types'

const TimeLine = () => {
  const [timeline, setTimeline] = useRecoilState(timelineState)

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
      const oldIndex = timeline.findIndex(
        (v: TimelineData) => v.id === active.id
      )
      const newIndex = timeline.findIndex((v: TimelineData) => v.id === over.id)
      setTimeline(arrayMove(timeline, oldIndex, newIndex))
    }
  }

  return (
    <Box
      display={'flex'}
      width={'100%'}
      height={'100vh'}
      sx={{ overflowX: 'auto', overflowY: 'hidden' }}
    >
      {!timeline || timeline.length === 0 ? (
        <BlankContents message={t('timeline.noTimeline')} />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={timeline}
            strategy={horizontalListSortingStrategy}
          >
            {timeline.map(
              (item: TimelineData) => item.visible && <Pane id={item.id}></Pane>
            )}
          </SortableContext>
        </DndContext>
      )}
    </Box>
  )
}
export default TimeLine
