/**
 * ---------------------- Dev Settings ----------------------
 */
const isLogging = true
const moduleName = 'selectTalkRoom.ts'

/**
 * ---------------------- Import ----------------------
 */

 // React
import { atom } from 'recoil'

// Library
export const selectTalkRoom = atom<string>({
  key: 'TalkRoom', default: ''
})