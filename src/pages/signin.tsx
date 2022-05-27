import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { useAuthContext } from "../contexts/AuthContext"
import { Alert } from "@mui/material"
import { IAuthResult, ResultType } from "../types/authResult"
import { FormEvent, useRef, useState } from "react"

function SignIn() {
  const [hasRemember, setHasRemember] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [result, setResult] = useState<IAuthResult>({
    type: ResultType.None,
    content: "",
  })

  const { user, signIn } = useAuthContext()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (user) {
      setIsWaiting(false)
      return setResult({
        type: ResultType.Info,
        content: "You are arleady signed in",
      })
    }

    setIsWaiting(true)

    const data = new FormData(event.currentTarget)
    try {
      console.log(hasRemember)

      await signIn(
        (data.get("email") as string) ?? "",
        (data.get("password") as string) ?? "",
        hasRemember ?? false
      )

      setResult({
        type: ResultType.Success,
        content: "Sign in successed...",
      })
    } catch {
      setResult({ type: ResultType.Error, content: "Sign in filed..." })
    }
    setIsWaiting(false)
  }

  return (
    <>
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
            Sign in
          </Typography>

          {result?.type !== "none" && (
            <Alert sx={{ mt: 1, w: 1 }} severity={result?.type}>
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => setHasRemember(e.target.checked)}
                  name="remember"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isWaiting}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default SignIn
