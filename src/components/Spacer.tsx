import { Box } from '@mui/material'

export interface Props {
  size: string
  horizontal?: boolean
}

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
