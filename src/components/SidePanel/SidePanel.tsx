import { useState } from 'react'
import { Box, Drawer, IconButton, Modal, Tooltip, Avatar } from '@mui/material'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import ViewWeekIcon from '@mui/icons-material/ViewWeek'
import SettingsIcon from '@mui/icons-material/Settings'
import InfoIcon from '@mui/icons-material/Info'
import ExpandMenuHeader from './ExpandMenuHeader'
import NewTalkMenu from './NewTalkMenu/NewTalkMenu'
import SettingsMenu from './SettingsMenu/SettingsMenu'

const SidePanel = () => {
  const [expandMenu, setExpandMenu] = useState<string>('')

  const drawerWidth = expandMenu === '' ? 'var(--menu-closed-width)' : '600px'
  const expandMenuWidth = expandMenu === '' ? '0px' : '600px'

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="permanent"
        sx={{
          display: 'flex',
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            height: '100vh',
            width: drawerWidth,
            display: 'flex',
            flexDirection: 'row',
            boxShadow: 24,
            overflow: 'hidden',
          },
        }}
        open
      >
        <Box
          sx={{
            height: '16rem',
            width: 'var(--menu-closed-width)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Tooltip title="New Talk">
            <IconButton
              onClick={() =>
                expandMenu === 'newTalk'
                  ? setExpandMenu('')
                  : setExpandMenu('newTalk')
              }
              sx={{ alignItems: 'center' }}
            >
              <DriveFileRenameOutlineIcon
                color={expandMenu === 'newTalk' ? 'primary' : undefined}
                fontSize="large"
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Column Settings">
            <IconButton
              onClick={() =>
                expandMenu === 'columnSettings'
                  ? setExpandMenu('')
                  : setExpandMenu('columnSettings')
              }
            >
              <ViewWeekIcon
                color={expandMenu === 'columnSettings' ? 'primary' : undefined}
                fontSize="large"
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings">
            <IconButton
              onClick={() =>
                expandMenu === 'settings'
                  ? setExpandMenu('')
                  : setExpandMenu('settings')
              }
            >
              <SettingsIcon
                color={expandMenu === 'settings' ? 'primary' : undefined}
                fontSize="large"
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Info">
            <IconButton
              onClick={() =>
                expandMenu === 'info'
                  ? setExpandMenu('')
                  : setExpandMenu('info')
              }
            >
              <InfoIcon
                color={expandMenu === 'info' ? 'primary' : undefined}
                fontSize="large"
              />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ height: '100vh', width: expandMenuWidth }}>
          {expandMenu === 'newTalk' ? (
            <Box>
              <ExpandMenuHeader
                title={'新しい会話を作成する'}
                setExpandMenu={setExpandMenu}
              ></ExpandMenuHeader>
              <NewTalkMenu setExpandMenu={setExpandMenu} />
            </Box>
          ) : expandMenu === 'columnSettings' ? (
            <ExpandMenuHeader
              title={'カラムを編集する'}
              setExpandMenu={setExpandMenu}
            ></ExpandMenuHeader>
          ) : expandMenu === 'settings' ? (
            <Box>
              <ExpandMenuHeader
                title={'設定を変更する'}
                setExpandMenu={setExpandMenu}
              ></ExpandMenuHeader>
              <SettingsMenu />
            </Box>
          ) : expandMenu === 'info' ? (
            <ExpandMenuHeader
              title={'情報'}
              setExpandMenu={setExpandMenu}
            ></ExpandMenuHeader>
          ) : null}
        </Box>
      </Drawer>
    </Box>
  )
}

export default SidePanel
