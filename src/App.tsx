import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { settingsState } from './atoms/settingsState'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import SidePanel from './components/SidePanel/SidePanel'
import { theme } from './utils/theme'
import TimeLine from './components/TimeLine/TimeLine'
import { createDataDir } from './utils/files'
import './i18n/configs'

const App = () => {
  useEffect(() => {
    ;(async () => {
      await createDataDir()
    })()
  }, [])

  const settings = useRecoilValue(settingsState)

  return (
    <ThemeProvider theme={theme(settings.Theme)}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <SidePanel />
        <TimeLine />
      </Box>
    </ThemeProvider>
  )
}

export default App
