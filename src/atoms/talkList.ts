// Recoil
import { atom } from 'recoil'

// Types
import { TalkList } from '../types/types'

// Utils
import { getTalkListFile } from '../utils/files'

const setDefaultValue = async () => {
  return await getTalkListFile()
}

export const talkListState = atom<TalkList>({
  key: 'TalkListState',
  default: setDefaultValue(),
})
