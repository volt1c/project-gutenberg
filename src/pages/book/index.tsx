import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import { Paper, InputBase, IconButton, Stack } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useState } from "react"
import FiltersDialog from "../../components/FiltersDialog"
import BookItem from "../../components/BookItem"

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function BookPage() {
  const [open, setOpen] = useState(false)

  return (
    <main>
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
              <BookItem
                book={{
                  id: 0,
                  type: "Text",
                  title: "Example Book",
                  description: "Some great description",
                  downloads: 2137,
                  license: "Some license",
                  subjects: [],
                  bookshelves: [],
                  languages: [],
                  agents: [
                    { id: 0, person: "Jan Kowalski", type: "" },
                    { id: 1, person: "Joe Black", type: "" },
                  ],
                  resources: [],
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <FiltersDialog
        open={open}
        onClose={() => setOpen(false)}
        onApply={(f) => console.log(f)}
      />
    </main>
  )
}

export default BookPage
