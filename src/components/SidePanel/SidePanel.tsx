import { useState } from 'react'
import { Box, Drawer, IconButton, Modal, Tooltip, Avatar } from '@mui/material'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import ViewWeekIcon from '@mui/icons-material/ViewWeek'
import SettingsIcon from '@mui/icons-material/Settings'
import InfoIcon from '@mui/icons-material/Info'
import ExpandMenuHeader from './ExpandMenuHeader'
import SettingsMenu from './SettingsMenu/SettingsMenu'
import { t } from 'i18next'
import EditColumnsMenu from './EditColumnsMenu/EditColumnsMenu'
import ConversationEdit from '../UI/ConversationEdit'
import InformationMenu from './InformationMenu/informationMenu'

const SidePanel = () => {
  const [expandMenu, setExpandMenu] = useState<string>('')

  const drawerWidth = expandMenu === '' ? 'var(--menu-closed-width)' : '600px'
  const expandMenuWidth = expandMenu === '' ? '0px' : '540px'

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
          <Tooltip title={t('menu.newTalk')}>
            <IconButton
              onClick={() =>
                expandMenu === 'newTalk'
                  ? setExpandMenu('')
                  : setExpandMenu('newTalk')
              }
              sx={{ alignItems: 'center' }}
            >
              <DriveFileRenameOutlineIcon
                fontSize="large"
                sx={{
                  color:
                    expandMenu === 'newTalk'
                      ? 'icon.selection'
                      : 'icon.primary',
                }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('menu.editColumns')}>
            <IconButton
              onClick={() =>
                expandMenu === 'columnSettings'
                  ? setExpandMenu('')
                  : setExpandMenu('columnSettings')
              }
            >
              <ViewWeekIcon
                fontSize="large"
                sx={{
                  color:
                    expandMenu === 'columnSettings'
                      ? 'icon.selection'
                      : 'icon.primary',
                }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('menu.changeSettings')}>
            <IconButton
              onClick={() =>
                expandMenu === 'settings'
                  ? setExpandMenu('')
                  : setExpandMenu('settings')
              }
            >
              <SettingsIcon
                fontSize="large"
                sx={{
                  color:
                    expandMenu === 'settings'
                      ? 'icon.selection'
                      : 'icon.primary',
                }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title={t('menu.info')}>
            <IconButton
              onClick={() =>
                expandMenu === 'info'
                  ? setExpandMenu('')
                  : setExpandMenu('info')
              }
            >
              <InfoIcon
                fontSize="large"
                sx={{
                  color:
                    expandMenu === 'info' ? 'icon.selection' : 'icon.primary',
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>

        <Box
          sx={{
            height: '100%',
            width: expandMenuWidth,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {expandMenu === 'newTalk' ? (
            <>
              <ExpandMenuHeader
                title={t('menu.newTalk')}
                setExpandMenu={setExpandMenu}
              ></ExpandMenuHeader>
              <ConversationEdit
                editMode="new"
                handleClose={() => setExpandMenu('')}
              />
            </>
          ) : expandMenu === 'columnSettings' ? (
            <>
              <ExpandMenuHeader
                title={t('menu.editColumns')}
                setExpandMenu={setExpandMenu}
              ></ExpandMenuHeader>
              <EditColumnsMenu />
            </>
          ) : expandMenu === 'settings' ? (
            <>
              <ExpandMenuHeader
                title={t('menu.changeSettings')}
                setExpandMenu={setExpandMenu}
              ></ExpandMenuHeader>
              <SettingsMenu />
            </>
          ) : expandMenu === 'info' ? (
            <>
              <ExpandMenuHeader
                title={t('menu.info')}
                setExpandMenu={setExpandMenu}
              ></ExpandMenuHeader>
              <InformationMenu />
            </>
          ) : null}
        </Box>
      </Drawer>
    </Box>
  )
}

export default SidePanel
