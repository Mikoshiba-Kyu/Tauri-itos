/**
 * ---------------------- Dev Settings ----------------------
 */
const isLogging = true
const moduleName = 'selectAvatarFile.ts'

/**
 * ---------------------- Import ----------------------
 */

 // React
import { atom } from 'recoil'

// Library
export const selectAvatarFile = atom<string>({
  key: 'AvatarFile', default: ''
})