/**
 * ---------------------- Dev Settings ----------------------
 */
const isLogging = true
const moduleName = 'MainWindow.tsx'

/**
 * ---------------------- Import ----------------------
 */

// React
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { settingsState } from '../atoms/settingsState'

// MUI
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// Components
import SidePanel from './SidePanel'
import Content from './Content'

// Utils
import { lightTheme, darkTheme } from '../utils/theme'

// Types
import { Talks } from '../types/types'

/**
 * ---------------------- Contents ----------------------
 */
const MainWindow = () => {
  isLogging && console.log(`[App] [${moduleName}] Render.`)

  const settings = useRecoilValue(settingsState)
  const [talks, setTalks] = useState<Talks>([])
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
          <Content />
        </Box>
      </ThemeProvider>
    </>
  )
}

export default MainWindow
