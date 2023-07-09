/**
 * ---------------------- Dev Settings ----------------------
 */
const isLogging = true
const moduleName = 'settingsState.ts'

/**
 * ---------------------- Import ----------------------
 */

 // React
import { atom } from 'recoil'

// Library
import { loadConfig } from '../utils/config'
import type { Config } from '../utils/config'

export const settingsState = atom<Config>({
  key: 'UserConfig', default: loadConfig()
})