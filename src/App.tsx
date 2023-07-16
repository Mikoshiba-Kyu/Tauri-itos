import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { settingsState } from './atoms/settingsState'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import SidePanel from './components/SidePanel/SidePanel'
import { lightTheme, darkTheme } from './utils/theme'
import TimeLine from './components/TimeLine/TimeLine'

const App = () => {
  const settings = useRecoilValue(settingsState)

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
          <TimeLine />
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App
