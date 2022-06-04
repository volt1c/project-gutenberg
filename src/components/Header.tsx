import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material"
import Icon from "@mui/icons-material/MenuBook"
import Link from "next/link"
import { Box } from "@mui/system"
import { Star } from "@mui/icons-material"
import { useAuthContext } from "../contexts/AuthContext"

function Header() {
  const { user, signOut } = useAuthContext()

  return (
    <AppBar position="relative">
      <Toolbar>
        <Link href="/">
          <Icon sx={{ mr: 2, transform: "scale(1.5)" }} />
        </Link>
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
        {user ? (
          <>
            <Button
              color="inherit"
              sx={{ mr: 1, textTransform: "none" }}
              onClick={signOut}
            >
              Sign Out
            </Button>
            <Link href="/book/favorites">
              <IconButton>
                <Star />
              </IconButton>
            </Link>
          </>
        ) : (
          <Link href="/signin">
            <Button color="inherit" sx={{ mr: 1, textTransform: "none" }}>
              Sign In
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
