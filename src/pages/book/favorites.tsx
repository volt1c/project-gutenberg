import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Link from "next/link"
import { Paper, InputBase, IconButton, Stack } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useEffect, useState } from "react"
import FiltersDialog from "../../components/FiltersDialog"
import Router from "next/router"
import { useAuthContext } from "../../contexts/AuthContext"

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function BooksFavoritesPage() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  const { user } = useAuthContext()

  useEffect(() => {
    if (!user) Router.push("/signin")
    if (user) setVisible(true)
  })

  return (
    <main>
      {visible && (
        <Container sx={{ py: 4 }} maxWidth="xl">
          <Stack direction="row" spacing={{ sm: 2 }} sx={{ py: 2 }}>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
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
            <Button variant="contained" onClick={() => setOpen(true)}>
              Filters
            </Button>
          </Stack>
          <Grid container spacing={4} columns={{ xs: 8, sm: 12, md: 16 }}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Link href={`/book/${card}`}>
                      <Button size="small">Read</Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      <FiltersDialog
        open={open}
        onClose={() => setOpen(false)}
        onApply={(f) => console.log(f)}
      />
    </main>
  )
}

export default BooksFavoritesPage
