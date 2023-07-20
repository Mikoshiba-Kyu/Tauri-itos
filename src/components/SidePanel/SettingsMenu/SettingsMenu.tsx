import { useRecoilState } from 'recoil'
import { settingsState } from '../../../atoms/settingsState'
import {
  Box,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
  Radio,
} from '@mui/material'
import { Spacer } from '../../UI/Spacer'
import { saveConfig } from '../../../utils/config'

const style = {
  width: '100%',
  height: 'calc(100vh - var(--expand-menu-header-height))',
  padding: '1rem',
  overflowY: 'auto',
}

const SettingsMenu = () => {
  const [settings, setSettings] = useRecoilState(settingsState)

  // Theme
  const onThemeChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value

    setSettings({ ...settings, ...{ Theme: value } })
    ;(async () => {
      await saveConfig({ Theme: value })
    })()
  }

  // ChatGPT API Key
  const onAPIKeyChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value

    setSettings({ ...settings, ...{ ApiKey: value } })
    ;(async () => {
      await saveConfig({ ApiKey: value })
    })()
  }

  // Timeline Sort
  const onTimelineSortChange =
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value

      setSettings({ ...settings, ...{ TimelineSort: value } })
      ;(async () => {
        await saveConfig({ TimelineSort: value })
      })()
    }

  return (
    <Box sx={style}>
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

      <Spacer size="2rem" />

      <TextField
        fullWidth
        label="ChatGPT API Key"
        size="small"
        variant="standard"
        defaultValue={settings.ApiKey}
        onChange={onAPIKeyChange()}
      />

      <Spacer size="2rem" />

      <FormControl>
        <FormLabel>
          <Typography variant="caption">タイムラインの並び順</Typography>
        </FormLabel>

        <RadioGroup
          row
          defaultValue={() => settings.TimelineSort}
          onChange={onTimelineSortChange()}
        >
          <FormControlLabel
            value="asc"
            control={<Radio size="small" />}
            label="昇順"
          />
          <FormControlLabel
            value="desc"
            control={<Radio size="small" />}
            label="降順"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default SettingsMenu
