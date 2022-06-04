import * as React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"
import GitHubIcon from "@mui/icons-material/GitHub"

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
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" textAlign="center">
          Site created as recruitment task
        </Typography>
        <Typography variant="body1" textAlign="center">
          <GitHubIcon fontSize="inherit" />{" "}
          <Link
            href="https://github.com/volt1c/project-gutenberg"
            color="inherit"
          >
            Github repository.
          </Link>
        </Typography>
        <Copyright />
      </Container>
    </Box>
  )
}

export default Footer
