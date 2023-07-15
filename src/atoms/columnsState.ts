// Recoil
import { atom } from 'recoil'

// Types
import { ColumnList } from '../types/types'

// Utils
import { getColumnListFile } from '../utils/files'

const setDefaultValue = async () => {
  return await getColumnListFile()
}

export const columnsState = atom<ColumnList>({
  key: 'ColumnListState',
  default: setDefaultValue(),
})
