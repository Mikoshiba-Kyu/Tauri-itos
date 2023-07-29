export type TalkFile = {
  id: string
  name: string
  assistantIconFileName: string
  talks: TalkData[]
}
export type TalkData = {
  number: number
  timestamp: string
  model?: string
  completionTokens?: number
  promptTokens?: number
  totalTokens?: number
  message: { role: string; content: string }
}

export type ConfigFile = {
  theme?: string
  language?: string
  userIconFileName?: string
  apiKey?: string
  timelineSort?: string
}

export type TalkList = { id: string; name: string }[]
export type ColumnList = string[]
