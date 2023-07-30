import { atom } from 'recoil'
import { Timeline } from '../types/types'
import { loadTextFileInDataDir } from '../utils/files'

const setDefaultValue = async (): Promise<Timeline> => {
  const result = await loadTextFileInDataDir('Timeline.json')
  return result as Timeline
}

export const timelineState = atom<Timeline>({
  key: 'TimelineState',
  default: setDefaultValue(),
})
