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
    paper: '#002984',
  },
  text: {
    primary: '#424242',
    secondary: '#828282',
  },
  iconColor: {
    primary: '#424242',
    secondary: '#EAEAEA',
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
    secondary: '#868598',
  },
  iconColor: {
    primary: '#EAEAEA',
    secondary: '#EAEAEA',
  },
}
