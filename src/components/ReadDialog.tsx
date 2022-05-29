import { Close } from "@mui/icons-material"
import {
  AppBar,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import React from "react"

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface ReadDialogProps {
  open: boolean
  onClose: () => void
  bookSrc: string
}

function ReadDialog({ open, onClose, bookSrc }: ReadDialogProps) {
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2 }} variant="h6" component="div">
              Read Book
            </Typography>
          </Toolbar>
        </AppBar>
        <iframe src={bookSrc} height="100%"></iframe>
      </Dialog>
    </div>
  )
}

export default ReadDialog
