import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import { Paper, InputBase, IconButton, Stack } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useEffect, useState } from "react"
import FiltersDialog from "../../components/FiltersDialog"
import Router from "next/router"
import { useAuthContext } from "../../contexts/AuthContext"
import { getFavoritesByUserUid } from "../../firebase/firestore"
import { IBook } from "../../types/api"
import { fetchBooksByIds } from "../../utils/fetchApi"
import BookScroll from "../../components/BookScroll"

function BooksFavoritesPage() {
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(-1)
  const [visible, setVisible] = useState(false)
  const [books, setBooks] = useState<IBook[]>([])

  const auth = useAuthContext()
  const { user, isReady } = auth

  if (user) (async () => console.log(await getFavoritesByUserUid(user.uid)))()

  useEffect(() => {
    if (!isReady) return
    if (!user) Router.push("/signin")
    if (user) {
      setVisible(true)

      getFavoritesByUserUid(user?.uid).then((favorites) => {
        setCount(favorites.length)

        fetchBooksByIds(favorites.map((f) => f.book_id)).then((b) => {
          setBooks(b)
        })
      })
    }
  }, [isReady, user])

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
          <BookScroll
            count={count}
            next={() => {}}
            hasMore={false}
            books={books}
          />
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
