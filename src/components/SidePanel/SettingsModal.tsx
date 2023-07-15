/**
 * ---------------------- Dev Settings ----------------------
 */
const isLogging = true
const moduleName = 'SettingsModal.tsx'

/**
 * ---------------------- Import ----------------------
 */

// React
import { useRecoilState } from 'recoil'
import { settingsState } from '../../atoms/settingsState'

// MUI
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { Spacer } from '../Spacer'

// Utils
import { saveConfig } from '../../utils/config'

/**
 * ---------------------- Props ----------------------
 */
export interface Props {}

/**
 * ---------------------- Styles ----------------------
 */
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 400,
  bgcolor: 'background.paper',
  borderRadius: '0.6rem',
  boxShadow: 24,
  p: 4,
}

/**
 * ---------------------- Contents ----------------------
 */
const SettingsModal = (props: Props) => {
  isLogging && console.log(`[App] [${moduleName}] Render.`)

  const [settings, setSettings] = useRecoilState(settingsState)

  /**
   * テーマ
   */
  const onThemeChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value

    setSettings({ ...settings, ...{ Theme: value } })
    ;(async () => {
      await saveConfig({ Theme: value })
    })()
  }

  /**
   * ChatGPT API Key
   */
  const onAPIKeyChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value

    setSettings({ ...settings, ...{ ApiKey: value } })
    ;(async () => {
      await saveConfig({ ApiKey: value })
    })()
  }

  return (
    <Box sx={style}>
      <h2>設定</h2>
      <Spacer size="1rem" />

      <FormControl>
        <FormLabel>
          <Typography variant="caption">テーマ</Typography>
        </FormLabel>

        <RadioGroup
          row
          defaultValue={() => settings.Theme}
          onChange={onThemeChange()}
        >
          <FormControlLabel
            value="light"
            control={<Radio size="small" />}
            label="Light"
          />
          <FormControlLabel
            value="dark"
            control={<Radio size="small" />}
            label="Dark"
          />
        </RadioGroup>
      </FormControl>

      <Spacer size="1rem" />

      <TextField
        fullWidth
        label="ChatGPT API Key"
        size="small"
        variant="standard"
        defaultValue={settings.ApiKey}
        onChange={onAPIKeyChange()}
      />
    </Box>
  )
}

export default SettingsModal
