import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Head from "next/head"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { useAuthContext } from "../contexts/AuthContext"
import { Alert } from "@mui/material"
import { IAuthResult, ResultType } from "../types/authResult"

function ResetPassword() {
  const [isWaiting, setIsWaiting] = React.useState(false)
  const [result, setResult] = React.useState<IAuthResult>({
    type: ResultType.None,
    content: "",
  })

  const { resetPassword } = useAuthContext()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    setIsWaiting(true)

    try {
      await resetPassword((data.get("email") as string) ?? "")
      setResult({
        type: ResultType.Success,
        content: "Link to reset your password has been send...",
      })
    } catch {
      setResult({
        type: ResultType.Error,
        content: "Something went wrong...",
      })
    }

    setIsWaiting(false)
  }

  return (
    <>
      <Head>
        <title>Project Gutenberg | Reset Password</title>
      </Head>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset password
          </Typography>

          {result?.type !== "none" && (
            <Alert sx={{ mt: 1 }} severity={result?.type}>
              {result?.content}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isWaiting}
            >
              Reset password
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don&apos;t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default ResetPassword
