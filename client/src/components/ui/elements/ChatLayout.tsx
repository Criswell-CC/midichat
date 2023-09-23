import React, { PropsWithChildren} from 'react'
import { Box, Typography } from '@mui/material'

const ChatLayout = ({ children }: PropsWithChildren) => {

  return (
    <Box>
      <Box sx={{width: "100%", paddingLeft: "4%", paddingRight: "4%"}}>
        <Typography color="common.black" textAlign="center" fontWeight="bold" paddingTop="3%" borderBottom="1px solid">
          Chat
        </Typography>
      </Box>
      <Box sx={{ paddingTop: "1vh" }}>
        {children}
      </Box>
    </Box>
  )
}

export default ChatLayout