import type { AppProps } from "next/app"
import Layout from "../layouts/Layout"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { AuthProvider } from "../contexts/AuthContext"

const theme = createTheme({
  palette: {
    mode: "dark",
  },
})

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
