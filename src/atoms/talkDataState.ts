/**
 * ---------------------- Dev Settings ----------------------
 */
const isLogging = true
const moduleName = 'talkDataState.ts'

/**
 * ---------------------- Import ----------------------
 */

 // React
import { atom } from 'recoil'

// Types
import { Talks } from '../types/types'

export const talkDataState = atom<Talks>({
  key: 'TalkDataState', default: []
})
