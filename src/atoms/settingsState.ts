import { atom } from 'recoil'
import { loadConfig } from '../utils/config'
import type { ConfigFile } from '../types/types'

export const settingsState = atom<ConfigFile>({
  key: 'UserConfig',
  default: loadConfig(),
})
