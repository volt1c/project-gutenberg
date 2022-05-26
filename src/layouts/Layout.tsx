import { Box, Container, CssBaseline } from "@mui/material"
import { PropsWithChildren } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"

function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />

        {children}
        <Footer />
      </Box>
    </>
  )
}

export default Layout
