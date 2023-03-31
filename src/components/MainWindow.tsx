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
import { ThemeProvider, createTheme } from "@mui/material/styles"

// Components
import SidePanel from './SidePanel'
import Content from './Content'

// Types
import { Talks } from '../types/types'

/**
 * ---------------------- Contents ----------------------
 */
const MainWindow = () => {
	isLogging && console.log(`[App] [${moduleName}] Render.`)

	const settings = useRecoilValue(settingsState)
	const [ talks, setTalks ] = useState<Talks>([])
	const [ isOpenPanel, setOpenPanel ] = useState(false)

	const theme = createTheme({
		palette: {
			//TODO 型
			//@ts-ignore
			mode: settings.Theme
		}
	})

	return (
        <>
			<ThemeProvider theme={theme}>
				<Box sx={{ display: 'flex' }}>
					<CssBaseline />
					<SidePanel isOpenPanel={isOpenPanel} setOpenPanel={setOpenPanel} talks={talks} setTalks={setTalks}/>
					<Content talks={talks} setTalks={setTalks}/>
				</Box>
			</ThemeProvider>
        </>
	)
}

export default MainWindow