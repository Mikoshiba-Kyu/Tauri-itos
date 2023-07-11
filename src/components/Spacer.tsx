/**
 * ---------------------- Dev Settings ----------------------
 */
const isLogging = true
const moduleName = 'Spacer.tsx'

/**
 * ---------------------- Import ----------------------
 */
import { Box } from '@mui/material'

/**
 * ---------------------- Props ----------------------
 */
export interface Props {
  size: string
  horizontal?: boolean
}

/**
 * ---------------------- Contents ----------------------
 */
export const Spacer = (props: Props) => {
  return (
    <Box
      style={
        props.horizontal
          ? {
              width: props.size,
              height: 'auto',
              display: 'inline-block',
              flexShrink: 0,
            }
          : { width: 'auto', height: props.size, flexShrink: 0 }
      }
    />
  )
}
