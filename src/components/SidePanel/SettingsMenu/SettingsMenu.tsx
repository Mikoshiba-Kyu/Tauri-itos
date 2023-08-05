import { useEffect, useState } from 'react'
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
  Avatar,
  Autocomplete,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { Spacer } from '../../UI/Spacer'
import { saveConfig } from '../../../utils/config'
import { useTranslation } from 'react-i18next'
import { t } from 'i18next'
import { convertFileSrc } from '@tauri-apps/api/tauri'
import { open } from '@tauri-apps/api/dialog'
import { copyFile } from '@tauri-apps/api/fs'
import { basename } from '@tauri-apps/api/path'
import { getDataDirPath } from '../../../utils/files'

const style = {
  width: '100%',
  flexGrow: 1,
  padding: '1rem',
  overflowY: 'auto',
}

const SettingsMenu = () => {
  const [settings, setSettings] = useRecoilState(settingsState)
  const { i18n } = useTranslation()

  const [dataDirPath, setDataDirPath] = useState('')
  useEffect(() => {
    ;(async () => {
      const result = await getDataDirPath()
      setDataDirPath(result)
    })()
  }, [])

  // Theme
  const handleThemeChange =
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value

      setSettings({ ...settings, ...{ theme: value } })
      ;(async () => {
        await saveConfig({ theme: value })
      })()
    }

  // Language
  const handleLanguageChange =
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value

      i18n.changeLanguage(value)

      setSettings({ ...settings, ...{ language: value } })
      ;(async () => {
        await saveConfig({ language: value })
      })()
    }

  // ChatGPT API Key
  const handleAPIKeyChange =
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value

      setSettings({ ...settings, ...{ apiKey: value } })
      ;(async () => {
        await saveConfig({ apiKey: value })
      })()
    }

  // ChatGPT Model
  const handleModelChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    const resultValue = value ?? ''
    setSettings({ ...settings, ...{ model: resultValue } })
    ;(async () => {
      await saveConfig({ model: resultValue })
    })()
  }

  // Timeline Sort
  const handleTimelineSortChange =
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value

      setSettings({ ...settings, ...{ timelineSort: value } })
      ;(async () => {
        await saveConfig({ timelineSort: value })
      })()
    }

  const handleClickAvatar = async (): Promise<void> => {
    const result: string | string[] | null = await open({
      multiple: false,
      filters: [
        {
          name: 'Images',
          extensions: ['png', 'jpg', 'jpeg', 'gif', 'bmp'],
        },
      ],
    })

    if (!result) return

    const filePath = result as string

    // 画像ファイル以外の時は処理を終了する
    const pattern = /.*\.(png|jpg|jpeg|gif|bmp)$/
    if (!pattern.test(filePath)) return

    // 選択されたファイルをdataにコピーする
    const fileName = await basename(filePath)
    await copyFile(filePath, `${dataDirPath}${fileName}`)

    // atomsとファイルのUserIconFileNameを更新する
    setSettings({ ...settings, ...{ userIconFileName: fileName } })
    ;(async () => {
      await saveConfig({ userIconFileName: fileName })
    })()
  }

  return (
    <Stack sx={style}>
      <FormControl>
        <FormLabel>
          <Typography variant="caption">{t('settings.userAvatar')}</Typography>
        </FormLabel>

        <Avatar
          variant="square"
          src={convertFileSrc(`${dataDirPath}${settings.userIconFileName}`)}
          sx={{
            width: 82,
            height: 82,
            border: '2px solid',
            borderColor: 'primary.main',
            borderRadius: '0.5rem',
            margin: '0.5rem',
          }}
          onClick={handleClickAvatar}
        >
          <PersonIcon fontSize="large" />
        </Avatar>
      </FormControl>

      <Spacer size="2rem" />

      <FormControl>
        <FormLabel>
          <Typography variant="caption">{t('settings.theme')}</Typography>
        </FormLabel>

        <RadioGroup
          row
          defaultValue={() => settings.theme ?? 'dark'}
          onChange={handleThemeChange()}
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
          defaultValue={() => settings.language ?? 'en'}
          onChange={handleLanguageChange()}
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
        defaultValue={settings.apiKey ?? ''}
        onChange={handleAPIKeyChange()}
        sx={{
          borderBottom: '1px solid',
          borderBottomColor: 'inputOutline.primary',
        }}
      />

      <Spacer size="2rem" />

      <Autocomplete
        {...{ options: ['gpt-4', 'gpt-3.5-turbo'] }}
        id="select-on-focus"
        selectOnFocus
        onChange={(event: any, value: string | null) =>
          handleModelChange(event, value ?? '')
        }
        onInputChange={(event: any, value: string | null) =>
          handleModelChange(event, value ?? '')
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="ChatGPT Model"
            size="small"
            variant="standard"
            defaultValue={settings.model ?? ''}
          />
        )}
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
          defaultValue={() => settings.timelineSort ?? 'desc'}
          onChange={handleTimelineSortChange()}
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
