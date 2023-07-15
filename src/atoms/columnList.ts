// Recoil
import { atom } from 'recoil'

// Types
import { ColumnList } from '../types/types'

// Utils
import { loadColumnListFile } from '../utils/files'

const setDefaultValue = async () => {
  return await loadColumnListFile()
}

export const columnListState = atom<ColumnList>({
  key: 'ColumnListState',
  default: setDefaultValue(),
})
