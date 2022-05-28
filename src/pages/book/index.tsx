import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import { Paper, InputBase, IconButton, Stack } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useEffect, useState } from "react"
import FiltersDialog from "../../components/FiltersDialog"
import BookItem from "../../components/BookItem"
import { IBook } from "../../types/apiTypes"
import { fetchBooks } from "../../utils/fetchApi"
import InfiniteScroll from "react-infinite-scroll-component"

function BookPage() {
  const [open, setOpen] = useState(false)
  const [books, setBooks] = useState<IBook[]>([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchBooks().then((bookPage) => {
      setBooks(bookPage.results)
      setCount(bookPage.count)
      setPage(page + 1)
    })
  }, [])

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
        <InfiniteScroll
          next={() => {
            fetchBooks({ page }).then((bookPage) => {
              setBooks([...books, ...bookPage.results])
              setPage(page + 1)
            })
          }}
          endMessage={<>end...</>}
          hasMore={books.length < count}
          loader={<>Loading...</>}
          dataLength={books.length}
        >
          <Grid container spacing={4} columns={{ xs: 8, sm: 12, md: 16 }}>
            {books.map((book, idx) => (
              <Grid item key={idx} xs={12} sm={6} md={4}>
                <BookItem book={book} />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
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
