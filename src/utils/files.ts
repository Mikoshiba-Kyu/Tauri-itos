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
import { TalkList, TalkData, Columns } from '../types/types'

/**
 * ---------------------- Contents ----------------------
 */
export const getTalkListFile = async (): Promise<TalkList> => {
  isLogging && console.log(`[App] [${moduleName}] [getTalkListFile] Start`)

  const talkListFilePath = `${await appLocalDataDir()}data/talklist.json`
  const talkListJson = await readTextFile(talkListFilePath)

  isLogging && console.log(`[App] [${moduleName}] [getTalkListFile] End`)
  return JSON.parse(talkListJson)
}

export const getColumnsFile = async (): Promise<Columns> => {
  isLogging && console.log(`[App] [${moduleName}] [getColumnsFile] Start`)

  const columnsFilePath = `${await appLocalDataDir()}data/columns.json`
  const columnsJson = await readTextFile(columnsFilePath)

  isLogging && console.log(`[App] [${moduleName}] [getColumnsFile] End`)
  return JSON.parse(columnsJson)
}

export const getTalkFile = async (talkRoom: string): Promise<TalkData> => {
  isLogging && console.log(`[App] [${moduleName}] [getTalkFile] Start`)

  const talkFilePath = `${await appLocalDataDir()}Talkroom/${talkRoom}.json`
  const talkJson = await readTextFile(talkFilePath)

  isLogging && console.log(`[App] [${moduleName}] [getTalkFile] End`)
  return JSON.parse(talkJson).talks
}

export const saveTalks = async (
  talks: ({ role: string; content: string } | undefined)[],
  talkRoom: string
): Promise<void> => {
  isLogging && console.log(`[App] [${moduleName}] [saveTalks] Start`)

  const talkFilePath = `${await appLocalDataDir()}Talkroom/${talkRoom}.json`

  const talksData = { talks }

  await writeTextFile(talkFilePath, JSON.stringify(talksData, null, 2))
  isLogging && console.log(`[App] [${moduleName}] [saveTalks] End`)
}

export const loadPrompt = async (talkRoom: string): Promise<string> => {
  isLogging && console.log(`[App] [${moduleName}] [loadPrompt] Start`)

  const promptFilePath = `${await appLocalDataDir()}Prompt/${talkRoom}.txt`
  if (!(await exists(promptFilePath))) {
    isLogging &&
      console.log(`[App] [${moduleName}] ${talkRoom}.txt is not exists.`)
    return ''
  }

  const promptText = await readTextFile(promptFilePath)
  return promptText
}

export const getAvatarPath = async (talkRoom: string): Promise<string> => {
  isLogging && console.log(`[App] [${moduleName}] [getAvatarPath] Start`)

  return `${await appLocalDataDir()}Avatar/${talkRoom}.jpg`
}
