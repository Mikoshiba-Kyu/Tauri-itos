import { useRecoilValue } from 'recoil'
import { settingsState } from './atoms/settingsState'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import SidePanel from './components/SidePanel/SidePanel'
import { theme } from './utils/theme'
import TimeLine from './components/TimeLine/TimeLine'
import ShowError from './components/UI/ShowError'
import './i18n/configs'

const App = () => {
  const settings = useRecoilValue(settingsState)

  // Do not show right-click menus on applications.
  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault()
  }

  return (
    <ThemeProvider theme={theme(settings.theme ?? 'dark')}>
      <Box onContextMenu={handleContextMenu} sx={{ display: 'flex' }}>
        <CssBaseline />
        <SidePanel />
        <TimeLine />
        <ShowError />
      </Box>
    </ThemeProvider>
  )
}

export default App
