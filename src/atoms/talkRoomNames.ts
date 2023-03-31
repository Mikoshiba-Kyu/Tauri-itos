/**
 * ---------------------- Dev Settings ----------------------
 */
const isLogging = true
const moduleName = 'talkRoomNames.ts'

/**
 * ---------------------- Import ----------------------
 */

 // React
import { atom } from 'recoil'

// Tauri
import { appLocalDataDir, basename } from "@tauri-apps/api/path"
import { readDir } from "@tauri-apps/api/fs"

const getTalkFileNames = async (): Promise<string[]> => {

  const talkRoomDir = `${await appLocalDataDir()}Talkroom`
  const files = await readDir(talkRoomDir, { recursive: true })
  const jsonFiles = files.filter((file) => file.name && /\.json/.test(file.name))
  const talkFileNames = await Promise.all(jsonFiles.map((obj) => basename(obj.path, '.json')))

  return talkFileNames
}

export const talkRoomNames = atom<string[]>({
  key: 'TalkRoomNames', default: getTalkFileNames()
})
