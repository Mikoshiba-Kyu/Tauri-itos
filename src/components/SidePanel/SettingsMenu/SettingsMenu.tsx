import { useRecoilState } from 'recoil'
import { settingsState } from '../../../atoms/settingsState'
import {
  Stack,
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
import { useTranslation } from 'react-i18next'
import { t } from 'i18next'

const style = {
  width: '100%',
  height: 'calc(100% - var(--expand-menu-header-height) - 34px)', // TODO: 34pxのズレがどこから生まれるのか調査する
  padding: '1rem',
  overflowY: 'auto',
}

const SettingsMenu = () => {
  const [settings, setSettings] = useRecoilState(settingsState)
  const { i18n } = useTranslation()

  // Theme
  const onThemeChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value

    setSettings({ ...settings, ...{ Theme: value } })
    ;(async () => {
      await saveConfig({ Theme: value })
    })()
  }

  // Language
  const onLanguageChange =
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value

      i18n.changeLanguage(value)

      setSettings({ ...settings, ...{ Language: value } })
      ;(async () => {
        await saveConfig({ Language: value })
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
    <Stack sx={style}>
      <FormControl>
        <FormLabel>
          <Typography variant="caption">{t('settings.theme')}</Typography>
        </FormLabel>

        <RadioGroup
          row
          defaultValue={() => settings.Theme}
          onChange={onThemeChange()}
        >
          <FormControlLabel
            value="light"
            control={<Radio size="small" />}
            label={t('settings.light')}
          />
          <FormControlLabel
            value="dark"
            control={<Radio size="small" />}
            label={t('settings.dark')}
          />
        </RadioGroup>
      </FormControl>

      <Spacer size="2rem" />

      <FormControl>
        <FormLabel>
          <Typography variant="caption">{t('settings.language')}</Typography>
        </FormLabel>

        <RadioGroup
          row
          defaultValue={() => settings.Language}
          onChange={onLanguageChange()}
        >
          <FormControlLabel
            value="en"
            control={<Radio size="small" />}
            label={t('settings.english')}
          />
          <FormControlLabel
            value="ja"
            control={<Radio size="small" />}
            label={t('settings.japanese')}
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
          <Typography variant="caption">
            {t('settings.timelineSortOrder')}
          </Typography>
        </FormLabel>

        <RadioGroup
          row
          defaultValue={() => settings.TimelineSort}
          onChange={onTimelineSortChange()}
        >
          <FormControlLabel
            value="asc"
            control={<Radio size="small" />}
            label={t('settings.ascending')}
          />
          <FormControlLabel
            value="desc"
            control={<Radio size="small" />}
            label={t('settings.descending')}
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  )
}

export default SettingsMenu
