import type { AppProps } from "next/app"
import Layout from "../layouts/Layout"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme()

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
