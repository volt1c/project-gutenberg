import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import { Paper, InputBase, IconButton, Stack } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { FormEvent, useEffect, useRef, useState } from "react"
import FiltersDialog from "../../components/FiltersDialog"
import { IBook, IBookFilters } from "../../types/api"
import { fetchBooksWithFilters } from "../../utils/fetchApi"
import { useRouter } from "next/router"
import InfiniteScrollBook from "../../components/BookScroll"

function BookPage() {
  const [open, setOpen] = useState(false)
  const [books, setBooks] = useState<IBook[]>([])
  const [count, setCount] = useState(-1)
  const [page, setPage] = useState(1)

  const searchInput = useRef<HTMLInputElement>()

  const router = useRouter()

  const hasMore = () => books.length !== 0 && books.length < count

  const search = async (f: IBookFilters) => {
    setBooks([])
    setCount(-1)
    setPage(1)

    router.push(
      {
        pathname: "/book",
        query: { ...f },
      },
      undefined,
      { shallow: true }
    )

    fetchBooksWithFilters(f).then((bookPage) => {
      setBooks(bookPage.results)
      setCount(bookPage.count)
      setPage(page + 1)
    })
  }

  useEffect(() => {
    if (!router.isReady) return

    fetchBooksWithFilters({ ...router.query }).then((bookPage) => {
      setBooks(bookPage.results)
      setCount(bookPage.count)
      setPage(page + 1)
    })

    if (searchInput.current)
      searchInput.current.value = router.query.search?.toString() ?? ""
  }, [router.query])

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
        <InfiniteScrollBook
          next={() => {
            fetchBooksWithFilters({ page }).then((bookPage) => {
              setBooks([...books, ...bookPage.results])
              setPage(page + 1)
            })
          }}
          hasMore={hasMore()}
          books={books}
          count={count}
        />
      </Container>
      <FiltersDialog
        defaultFilters={{ ...(router.query as IBookFilters) }}
        open={open}
        onClose={() => setOpen(false)}
        onApply={(f) => {
          search({ search: searchInput.current?.value, ...f })
          setOpen(false)
        }}
      />
    </main>
  )
}

export default BookPage
