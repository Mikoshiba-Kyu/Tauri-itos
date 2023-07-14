// Recoil
import { atom } from 'recoil'

// Types
import { Columns } from '../types/types'

// Utils
import { getColumnsFile } from '../utils/files'

const setDefaultValue = async () => {
  return await getColumnsFile()
}

export const columnsState = atom<Columns>({
  key: 'ColumnsState',
  default: setDefaultValue(),
})
