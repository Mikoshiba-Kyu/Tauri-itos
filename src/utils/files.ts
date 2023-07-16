import { appLocalDataDir } from '@tauri-apps/api/path'
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs'
import { TalkList, ColumnList, TalkFile } from '../types/types'

/**
 * ---------------------- Contents ----------------------
 */
export const loadTalkListFile = async (): Promise<TalkList> => {
  const talkListFilePath = `${await appLocalDataDir()}data/Talklist.json`
  const talkListJson = await readTextFile(talkListFilePath)

  console.log(`[itos] Load ${talkListFilePath}`)
  return JSON.parse(talkListJson)
}

export const saveTalkListFile = async (data: TalkList): Promise<void> => {
  const talkListFilePath = `${await appLocalDataDir()}data/Talklist.json`
  await writeTextFile(talkListFilePath, JSON.stringify(data, null, 2))
  console.log(`[itos] Save ${talkListFilePath}`)
}

export const loadColumnListFile = async (): Promise<ColumnList> => {
  const columnListFilePath = `${await appLocalDataDir()}data/ColumnList.json`
  const columnListJson = await readTextFile(columnListFilePath)

  console.log(`[itos] Load ${columnListFilePath}`)
  return JSON.parse(columnListJson)
}

export const saveColumnListFile = async (data: string[]): Promise<void> => {
  const columnListFilePath = `${await appLocalDataDir()}data/Columnlist.json`
  await writeTextFile(columnListFilePath, JSON.stringify(data, null, 2))
  console.log(`[itos] Save ${columnListFilePath}`)
}

export const loadTalkFile = async (id: string): Promise<TalkFile> => {
  const talkFilePath = `${await appLocalDataDir()}data/${id}.json`
  const talkJson = await readTextFile(talkFilePath)

  console.log(`[itos] Load ${talkFilePath}`)
  return JSON.parse(talkJson)
}

export const saveTalkFile = async (data: TalkFile): Promise<void> => {
  const talkFilePath = `${await appLocalDataDir()}data/${data.id}.json`

  await writeTextFile(talkFilePath, JSON.stringify(data, null, 2))
  console.log(`[itos] Save ${talkFilePath}`)
}
