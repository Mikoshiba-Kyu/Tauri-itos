/**
 * ---------------------- Import ----------------------
 */

// React
import { useRecoilValue } from 'recoil'
import { selectTalkRoom } from '../../atoms/selectTalkRoom'
import { useEffect, useRef, useState } from 'react'

// MUI
import { Box } from '@mui/material'

// Components
import Header from './Header'
import Body from './Body'

// Type
import { TalkData } from '../../types/types'

// Utils
import { getTalkFile } from '../../utils/files'

/**
 * ---------------------- Props ----------------------
 */
interface Props {
  id: string
  name: string
}

/**
 * ---------------------- Component ----------------------
 */
const Pane = (props: Props) => {
  const { id, name } = props

  const [talkData, setTalkData] = useState<TalkData>([])

  // レンダリング時に対応するIDのトークファイルからデータを取得する
  useEffect(() => {
    const setData = async () => {
      const result = await getTalkFile(id)
      setTalkData(result)
    }
    setData()
  }, [])

  return (
    <Box sx={{ borderRight: '1px solid gray' }}>
      <Header id={id} name={name}></Header>
      <Body talkData={talkData}></Body>
    </Box>
  )
}

export default Pane
