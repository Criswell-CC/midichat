'use client'

import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

const Card = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  height: "14vh",
  width: "27vh",
  fontSize: "1.3em",
}))

export default Card