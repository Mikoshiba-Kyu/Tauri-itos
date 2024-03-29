import { appLocalDataDir } from '@tauri-apps/api/path'
import {
  readTextFile,
  writeTextFile,
  exists,
  createDir,
  removeFile,
} from '@tauri-apps/api/fs'
import { Timeline, ConversationFile } from '../types/types'

export const createDataDir = async (): Promise<void> => {
  const dataDirPath = `${await appLocalDataDir()}data`
  try {
    if (!(await exists(dataDirPath))) {
      await createDir(dataDirPath)
    }
  } catch (error) {
    console.error(error)
  }
}

export const loadTextFileInDataDir = async (
  fileName: string
): Promise<Timeline | ConversationFile> => {
  // If the data directory does not exist, recreate it.
  await createDataDir()

  // If there is no target file, it is created by default.
  const filePath = `${await appLocalDataDir()}data/${fileName}`
  if (!(await exists(filePath))) {
    await saveTextFileInDataDir(fileName, '[]')
  }

  const resultJson = await readTextFile(filePath)
  console.log(`[itos] Load ${filePath}`)
  return JSON.parse(resultJson)
}

export const saveTextFileInDataDir = async (
  fileName: string,
  data: string
): Promise<void> => {
  // If the data directory does not exist, recreate it.
  await createDataDir()

  const filePath = `${await appLocalDataDir()}data/${fileName}`
  try {
    await writeTextFile(filePath, data)
    console.log(`[itos] Save ${filePath}`)
  } catch (error) {
    console.error(error)
  }
}

export const deleteFileInDataDir = async (fileName: string): Promise<void> => {
  const filePath = `${await appLocalDataDir()}data/${fileName}`
  try {
    await removeFile(filePath)
    console.log(`[itos] Delete ${filePath}`)
  } catch (error) {
    console.error(error)
  }
}

export const getDataDirPath = async (): Promise<string> => {
  return `${await appLocalDataDir()}data/`
}
