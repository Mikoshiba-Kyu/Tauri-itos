import { atom } from 'recoil'
import { TalkList } from '../types/types'
import { loadTextFileInDataDir } from '../utils/files'

const setDefaultValue = async (): Promise<TalkList> => {
  const result = await loadTextFileInDataDir('TalkList.json')
  return result as TalkList
}

export const talkListState = atom<TalkList>({
  key: 'TalkListState',
  default: setDefaultValue(),
})
