/**
 * ---------------------- Dev Settings ----------------------
 */
const isLogging = true
const moduleName = 'App.tsx'

/**
 * ---------------------- Import ----------------------
 */
// React
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { settingsState } from './atoms/settingsState'
import { talkListState } from './atoms/talkList'

// MUI
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// Components
import SidePanel from './components/SidePanel'
import Content from './components/Content'
import Pane from './components/ColumnPane/Pane'

// Utils
import { lightTheme, darkTheme } from './utils/theme'

// Types

/**
 * ---------------------- Contents ----------------------
 */
const App = () => {
  isLogging && console.log(`[App] [${moduleName}] Render.`)

  const settings = useRecoilValue(settingsState)
  const talkList = useRecoilValue(talkListState)
  const [isOpenPanel, setOpenPanel] = useState(false)

  const theme = createTheme({
    //TODO 型
    //@ts-ignore
    palette: settings.Theme === 'light' ? lightTheme : darkTheme,
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <SidePanel />
          {/* <Content /> */}
          {talkList.map((item) => {
            return <Pane id={item.id} name={item.name}></Pane>
          })}
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App
