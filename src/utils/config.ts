import { appLocalDataDir } from '@tauri-apps/api/path'
import { exists, writeTextFile, readTextFile } from '@tauri-apps/api/fs'
import type { ConfigFile } from '../types/types'

const initConfig = async (): Promise<void> => {
  const cfgFilePath = `${await appLocalDataDir()}config.json`

  const settings: ConfigFile = {
    theme: 'dark',
    language: 'en',
    userIconFileName: '',
    apiKey: '',
    timelineSort: 'desc',
  }

  await writeTextFile(cfgFilePath, JSON.stringify(settings, null, 2))
}

export const loadConfig = async (): Promise<ConfigFile> => {
  const cfgFilePath = `${await appLocalDataDir()}config.json`

  // config.json が存在しなければ初期値で生成する
  if (!(await exists(cfgFilePath))) {
    console.log(`[itos] config.json is not exists. Re-create ${cfgFilePath}`)
    await initConfig()
  }

  const configText = await readTextFile(cfgFilePath)
  console.log(`[itos] Load ${cfgFilePath}`)

  return JSON.parse(configText)
}

export const saveConfig = async (param: object): Promise<void> => {
  const cfgFilePath = `${await appLocalDataDir()}config.json`

  // config.json が存在しなければ初期値で生成する
  if (!(await exists(cfgFilePath))) {
    await initConfig()
  }

  const configText = await readTextFile(cfgFilePath)
  const configJson = JSON.parse(configText)

  const update = { ...configJson, ...param }

  await writeTextFile(cfgFilePath, JSON.stringify(update, null, 2))
  console.log(`[itos] Save ${cfgFilePath}`)
}

export default loadConfig
