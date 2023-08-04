import { useRecoilState } from 'recoil'
import { showErrorState } from '../../atoms/showErrorState'
import { Snackbar, Alert } from '@mui/material'

const ShowError = () => {
  const [showError, setShowError] = useRecoilState(showErrorState)

  const handleErrorClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setShowError('')
  }

  return (
    <Snackbar
      open={showError !== ''}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={5000}
      onClose={handleErrorClose}
    >
      <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
        {showError}
      </Alert>
    </Snackbar>
  )
}
export default ShowError
