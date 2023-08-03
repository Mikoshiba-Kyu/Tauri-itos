export type ConversationFile = {
  id: string
  name: string
  assistantIconFileName: string
  conversations: ConversationData[]
}
export type ConversationData = {
  number: number
  timestamp: string
  model?: string
  completionTokens?: number
  promptTokens?: number
  totalTokens?: number
  message: { role: string; content: string }
}

export type Timeline = TimelineData[]

export type TimelineData = {
  id: string
  name: string
  visible: boolean
  columnWidth: string
}

export type ConfigFile = {
  theme?: string
  language?: string
  userIconFileName?: string
  apiKey?: string
  timelineSort?: string
}
