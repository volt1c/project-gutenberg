import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" textAlign="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Project Gutenberg
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" textAlign="center">
          Site created as reqruitment task
        </Typography>
        <Copyright />
      </Container>
    </Box>
  )
}

export default Footer
