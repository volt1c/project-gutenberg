import {
  Box,
  Container,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import type { NextPage } from "next"
import Head from "next/head"
import SearchIcon from "@mui/icons-material/Search"

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Project Gutenberg - Home</title>
      </Head>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Project Gutenberg
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Choose among free epub and Kindle eBooks, download them or read them
            online. You will find the world’s great literature here, with focus
            on older works for which U.S. copyright has expired. Thousands of
            volunteers digitized and diligently proofread the eBooks, for you to
            enjoy.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "90%",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for books..."
                inputProps={{ "aria-label": "search for books" }}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Stack>
        </Container>
      </Box>
    </div>
  )
}

export default Home
