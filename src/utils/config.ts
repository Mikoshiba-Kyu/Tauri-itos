import { appLocalDataDir } from '@tauri-apps/api/path'
import { exists, writeTextFile, readTextFile } from '@tauri-apps/api/fs'

export type Config = {
  Theme?: string
  Language?: string
  ApiKey?: string
  TimelineSort?: string
}

const initConfig = async (): Promise<void> => {
  const cfgFilePath = `${await appLocalDataDir()}config.json`

  const settings: Config = {
    Theme: 'dark',
    Language: 'en',
    ApiKey: '',
    TimelineSort: 'desc',
  }

  await writeTextFile(cfgFilePath, JSON.stringify(settings, null, 2))
}

/**
 * config.json の内容を Config型で取得する。
 */
export const loadConfig = async (): Promise<Config> => {
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

/**
 * config.json の特定キーの値を更新する。
 */
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
