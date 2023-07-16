import { atom } from 'recoil'
import { loadConfig } from '../utils/config'
import type { Config } from '../utils/config'

export const settingsState = atom<Config>({
  key: 'UserConfig',
  default: loadConfig(),
})
