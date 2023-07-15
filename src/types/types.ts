export type TalkFile = {
  id: string
  name: string
  talks: TalkData[]
}
export type TalkList = { id: string; name: string }[]
export type ColumnList = string[]
export type TalkData = { role: string; content: string }
