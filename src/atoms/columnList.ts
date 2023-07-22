import { atom } from 'recoil'
import { ColumnList } from '../types/types'
import { loadTextFileInDataDir } from '../utils/files'

const setDefaultValue = async (): Promise<ColumnList> => {
  const result = await loadTextFileInDataDir('ColumnList.json')
  return result as ColumnList
}

export const columnListState = atom<ColumnList>({
  key: 'ColumnListState',
  default: setDefaultValue(),
})
