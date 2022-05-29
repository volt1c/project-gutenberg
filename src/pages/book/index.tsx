import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import { Paper, InputBase, IconButton, Stack } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { FormEvent, useEffect, useRef, useState } from "react"
import FiltersDialog from "../../components/FiltersDialog"
import BookItem from "../../components/BookItem"
import { IBook, IBookFilters } from "../../types/apiTypes"
import { fetchBooks } from "../../utils/fetchApi"
import InfiniteScroll from "react-infinite-scroll-component"
import { useRouter } from "next/router"

function BookPage() {
  const [open, setOpen] = useState(false)
  const [books, setBooks] = useState<IBook[]>([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)

  const searchInput = useRef<HTMLInputElement>()

  const router = useRouter()

  const search = async (f: IBookFilters) => {
    setBooks([])
    setCount(0)
    setPage(1)

    router.push(
      {
        pathname: "/book",
        query: { ...f },
      },
      undefined,
      { shallow: true }
    )

    fetchBooks(f).then((bookPage) => {
      setBooks(bookPage.results)
      setCount(bookPage.count)
      setPage(page + 1)
    })
  }

  useEffect(() => {
    fetchBooks({ ...router.query }).then((bookPage) => {
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
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              event.preventDefault()
              search({ search: searchInput.current?.value })
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search for books..."
              inputProps={{
                "aria-label": "search for books",
                name: "search",
                ref: searchInput,
                defaultValue: router.query.search ?? "",
              }}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Filters
          </Button>
        </Stack>
        {books.length === 0 ? (
          <>Loading...</>
        ) : (
          <InfiniteScroll
            next={() => {
              fetchBooks({ page }).then((bookPage) => {
                setBooks([...books, ...bookPage.results])
                setPage(page + 1)
              })
            }}
            endMessage={<>end...</>}
            hasMore={books.length !== 0 && books.length < count}
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
        )}
      </Container>
      <FiltersDialog
        defaultFilters={{ ...(router.query as IBookFilters) }}
        open={open}
        onClose={() => setOpen(false)}
        onApply={(f) => search({ search: searchInput.current?.value, ...f })}
      />
    </main>
  )
}

export default BookPage
