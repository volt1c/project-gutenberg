import { AppBar, Button, Toolbar, Typography } from "@mui/material"
import Icon from "@mui/icons-material/MenuBook"
import Link from "next/link"
import { Box } from "@mui/system"

function Header() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Icon sx={{ mr: 2, transform: "scale(1.5)" }} />
        <Link href="/">
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ mr: 1 }}
          >
            Project Gutenberg
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Link href="/signin">
          <Button color="inherit" sx={{ mr: 1, textTransform: "none" }}>
            Sign In
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Header
