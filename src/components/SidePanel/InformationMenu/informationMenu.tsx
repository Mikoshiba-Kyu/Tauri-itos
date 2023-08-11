import { Stack, Grid, Typography, Link, Box } from '@mui/material'
import AppIcon from '../../../assets/app-icon.png'
import AppLogo from '../../../assets/itos_textlogo.png'
import { Spacer } from '../../UI/Spacer'

const style = {
  width: '100%',
  flexGrow: 1,
  padding: '1rem',
  overflowY: 'auto',
}

const InformationMenu = () => {
  return (
    <Stack sx={style}>
      <Grid container flexDirection="row" justifyContent="flex-start">
        <Grid item>
          <img
            src={AppIcon}
            alt={`application logo`}
            loading="lazy"
            width={50}
          />
        </Grid>
        <Grid item>
          <img
            src={AppLogo}
            alt={`application testlogo`}
            loading="lazy"
            width={100}
          />
        </Grid>
      </Grid>

      <Typography variant="caption">Version 1.0.0</Typography>

      <Spacer size="2rem" />

      <Typography variant="body2">
        itos is a desktop client application that allows you to manage multiple
        threads of ChatGPT conversations.
      </Typography>
      <Typography variant="body2">
        Just set the API KEY for ChatGPT to get started right away.
      </Typography>
      <Typography variant="body2">
        itos is a multi-platform application that runs on Windows, MacOS, and
        Linux.
      </Typography>

      <Spacer size="2rem" />

      <Typography variant="body2">
        Multiple conversations can be arranged on the screen.
      </Typography>
      <Typography variant="body2">
        Individual conversations can be easily displayed, hidden, and
        rearranged.
      </Typography>
      <Typography variant="body2">
        Each conversation can have its own prompt.
      </Typography>
      <Typography variant="body2">
        This allows you to give instructions to ChatGPT.
      </Typography>
      <Typography variant="body2">
        You can set icon files for yourself and for the assistant for each
        conversation.
      </Typography>
      <Typography variant="body2">
        This can be used for character-based conversations, etc.
      </Typography>
      <Typography variant="body2">
        Switch between English and Japanese, change color themes.
      </Typography>
      <Typography variant="body2">
        These screen display customizations are supported.
      </Typography>

      <Spacer size="4rem" />

      <Typography variant="body2">Github Repository</Typography>
      <Link
        variant="body2"
        target="_blank"
        href="https://github.com/Mikoshiba-Kyu/Tauri-itos"
      >
        Tauri-itos
      </Link>

      <Spacer size="2rem" />
      <Typography variant="body2">Author: Mikoshiba-Kyu</Typography>
      <Box display="flex">
        <Link
          variant="body2"
          target="_blank"
          href="https://twitter.com/mikoshiba_kyu"
        >
          X
        </Link>
        <Typography>&nbsp;/&nbsp;</Typography>
        <Link
          variant="body2"
          target="_blank"
          href="https://bsky.app/profile/mikoshibaq.bsky.social"
        >
          Bluesky
        </Link>
      </Box>
    </Stack>
  )
}

export default InformationMenu
