/**
 * ---------------------- Dev Settings ----------------------
 */
const isLogging = true
const moduleName = 'config.ts'

/**
  * ---------------------- Import ----------------------
  */
 // Tauri
import { appLocalDataDir, localDataDir } from "@tauri-apps/api/path"
import { exists, writeTextFile, readTextFile } from "@tauri-apps/api/fs"

export type Config = {
  Theme?: string
  ApiKey?: string
}

/**
 * config.json を初期値で生成する
 */
const initConfig = async (): Promise<void> => {
  isLogging && console.log(`[App] [${moduleName}] [initConfig] Start`)

  const cfgFilePath = `${await appLocalDataDir()}config.json`

  const settings = {
    Theme: 'light',
    ApiKey: ''
  }

  await writeTextFile(cfgFilePath, JSON.stringify(settings, null, 2))
  isLogging && console.log(`[App] [${moduleName}] [initConfig] Created default config.json.`)
  isLogging && console.log(`[App] [${moduleName}] [initConfig] End`)
}

/**
 * config.json の内容を Config型で取得する。
 */
export const loadConfig = async (): Promise<Config> => {
  isLogging && console.log(`[App] [${moduleName}] [loadConfig] Start`)

  const cfgFilePath = `${await appLocalDataDir()}config.json`

  // config.json が存在しなければ初期値で生成する
  if (!await exists(cfgFilePath)) {
    isLogging && console.log(`[App] [${moduleName}] config.json is exists.`)
    await initConfig()
  }

  const configText = await readTextFile(cfgFilePath)

  isLogging && console.log(`[App] [${moduleName}] [loadConfig] Load config.json ${configText}`)
  isLogging && console.log(`[App] [${moduleName}] [loadConfig] End`)
  return JSON.parse(configText)
}

/**
 * config.json の特定キーの値を更新する。
 */
export const saveConfig = async (param: object): Promise<void> => {
  isLogging && console.log(`[App] [${moduleName}] [saveConfig] Start`)

  const cfgFilePath = `${await appLocalDataDir()}config.json`

  // config.json が存在しなければ初期値で生成する
  if (!await exists(cfgFilePath)) {
    isLogging && console.log(`[App] [${moduleName}] config.json is exists.`)
    await initConfig()
  }

  const configText = await readTextFile(cfgFilePath)
  const configJson = JSON.parse(configText)

  const update = {...configJson, ...param}

  await writeTextFile(cfgFilePath, JSON.stringify(update, null, 2))
  isLogging && console.log(`[App] [${moduleName}] [saveConfig] End`)
}

export default loadConfig