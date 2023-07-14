import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Send } from '@mui/icons-material'

const inputStyle: object = {
  width: '100%',
  height: 'var(--column-open-input-height)',
}

const InputBox = () => {
  return (
    <Accordion disableGutters>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon fontSize="small" />}
        aria-controls="panel1a-content"
        sx={{ minHeight: 'var(--column-close-input-height)' }}
      ></AccordionSummary>
      <AccordionDetails>
        <Box sx={inputStyle}>
          <FormControl
            variant="outlined"
            sx={{ marginLeft: '2rem', width: '93%' }}
          >
            <OutlinedInput
              id="text-input"
              //value={inputVal}
              multiline
              fullWidth
              rows={5}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                //setInputValue(event.target.value)
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    //onClick={sending}
                    edge="end"
                  >
                    <Send />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
export default InputBox
