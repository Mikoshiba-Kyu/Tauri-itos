import { createTheme } from '@mui/material/styles'

export const theme = (mode?: string) =>
  createTheme({
    //TODO 型
    //@ts-ignore
    palette: mode === 'light' ? lightTheme : darkTheme,
  })

export const lightTheme = {
  mode: 'light',
  background: {
    default: '#EFEFEF',
    paper: '#004484',
  },
  text: {
    primary: '#EAEAEA',
    secondary: '#AAAAAA',
  },
  timelineHeaderText: {
    primary: '#343434',
    secondary: '#AAAAAA',
  },
  timelineText: {
    primary: '#343434',
    secondary: '#AAAAAA',
  },
  timelineBorder: {
    primary: '#888888',
  },
  icon: {
    primary: '#EAEAEA',
    secondary: '#008787',
    selection: '#1976d2',
  },
  inputOutline: {
    primary: '#AAAAAA',
  },
}

export const darkTheme = {
  mode: 'dark',
  background: {
    default: '#191925',
    paper: '#232334',
  },
  text: {
    primary: '#EAEAEA',
    secondary: '#AAAAAA',
  },
  timelineHeaderText: {
    primary: '#EAEAEA',
    secondary: '#AAAAAA',
  },
  timelineText: {
    primary: '#EAEAEA',
    secondary: '#AAAAAA',
  },
  timelineBorder: {
    primary: '#343434',
  },
  icon: {
    primary: '#EAEAEA',
    secondary: '#008787',
    selection: '#42a5f5',
  },
  inputOutline: {
    primary: '#AAAAAA',
  },
}
