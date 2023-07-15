// Recoil
import { atom } from 'recoil'

// Types
import { TalkList } from '../types/types'

// Utils
import { loadTalkListFile } from '../utils/files'

const setDefaultValue = async () => {
  return await loadTalkListFile()
}

export const talkListState = atom<TalkList>({
  key: 'TalkListState',
  default: setDefaultValue(),
})
