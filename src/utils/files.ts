/**
 * ---------------------- Dev Settings ----------------------
 */
const isLogging = true
const moduleName = 'files.ts'

/**
 * ---------------------- Import ----------------------
 */

// Tauri
import { appLocalDataDir } from '@tauri-apps/api/path'
import { exists, readTextFile, writeTextFile } from '@tauri-apps/api/fs'

// Types
import { TalkList, ColumnList, TalkFile } from '../types/types'

/**
 * ---------------------- Contents ----------------------
 */
export const loadTalkListFile = async (): Promise<TalkList> => {
  isLogging && console.log(`[App] [${moduleName}] [loadTalkListFile] Start`)

  const talkListFilePath = `${await appLocalDataDir()}data/Talklist.json`
  const talkListJson = await readTextFile(talkListFilePath)

  isLogging && console.log(`[App] [${moduleName}] [loadTalkListFile] End`)
  return JSON.parse(talkListJson)
}

export const saveTalkListFile = async (data: TalkList): Promise<void> => {
  isLogging && console.log(`[App] [${moduleName}] [saveTalkListFile] Start`)

  const talkListFilePath = `${await appLocalDataDir()}data/Talklist.json`
  await writeTextFile(talkListFilePath, JSON.stringify(data, null, 2))

  isLogging && console.log(`[App] [${moduleName}] [saveTalkListFile] End`)
}

export const loadColumnListFile = async (): Promise<ColumnList> => {
  isLogging && console.log(`[App] [${moduleName}] [loadColumnListFile] Start`)

  const columnListPath = `${await appLocalDataDir()}data/ColumnList.json`
  const columnListJson = await readTextFile(columnListPath)

  isLogging && console.log(`[App] [${moduleName}] [loadColumnListFile] End`)
  return JSON.parse(columnListJson)
}

export const saveColumnListFile = async (data: string[]): Promise<void> => {
  isLogging && console.log(`[App] [${moduleName}] [saveColumnListFile] Start`)

  const columnListFilePath = `${await appLocalDataDir()}data/Columnlist.json`
  await writeTextFile(columnListFilePath, JSON.stringify(data, null, 2))

  isLogging && console.log(`[App] [${moduleName}] [saveColumnListFile] End`)
}

export const loadTalkFile = async (id: string): Promise<TalkFile> => {
  isLogging && console.log(`[App] [${moduleName}] [loadTalkFile] Start`)

  const talkFilePath = `${await appLocalDataDir()}data/${id}.json`
  const talkJson = await readTextFile(talkFilePath)

  isLogging && console.log(`[App] [${moduleName}] [loadTalkFile] End`)
  return JSON.parse(talkJson)
}

export const saveTalkFile = async (data: TalkFile): Promise<void> => {
  isLogging && console.log(`[App] [${moduleName}] [saveTalkFile] Start`)

  const talkFilePath = `${await appLocalDataDir()}data/${data.id}.json`

  await writeTextFile(talkFilePath, JSON.stringify(data, null, 2))
  isLogging && console.log(`[App] [${moduleName}] [saveTalkFile] End`)
}
