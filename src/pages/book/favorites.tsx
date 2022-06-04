import Container from "@mui/material/Container"
import { Paper, InputBase, IconButton } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { FormEvent, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { useAuthContext } from "../../contexts/AuthContext"
import { getFavoritesByUserUid } from "../../firebase/firestore"
import { IBook } from "../../types/api"
import { fetchBooksByIds } from "../../utils/fetchApi"
import BookScroll from "../../components/BookScroll"
import Head from "next/head"

function BooksFavoritesPage() {
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(-1)
  const [visible, setVisible] = useState(false)
  const [books, setBooks] = useState<IBook[]>([])

  const searchInput = useRef<HTMLInputElement>()

  const router = useRouter()

  const auth = useAuthContext()
  const { user, isReady } = auth

  if (user) (async () => console.log(await getFavoritesByUserUid(user.uid)))()

  useEffect(() => {
    if (!isReady) return
    if (!user) router.push("/signin")
    if (user) {
      setVisible(true)

      getFavoritesByUserUid(user?.uid).then((favorites) => {
        fetchBooksByIds(
          favorites.map((f) => f.book_id),
          router.query.search
            ? (b) =>
                b.title
                  .toLowerCase()
                  .includes(router.query.search?.toString().toLowerCase() ?? "")
            : undefined
        ).then((b) => {
          setCount(favorites.length)
          setBooks(b)
        })
      })
    }
  }, [isReady, user, router.query])

  return (
    <>
      <Head>
        <title>Project Gutenberg | {router.query.search ?? "Favorites"}</title>
      </Head>
      <main>
        {visible && (
          <Container sx={{ py: 4 }} maxWidth="xl">
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                mb: 2,
              }}
              onSubmit={(event: FormEvent<HTMLFormElement>) => {
                event.preventDefault()
                router.push(
                  {
                    pathname: "/book/favorites",
                    query: { search: searchInput.current?.value ?? "" },
                  },
                  undefined,
                  { shallow: true }
                )
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for books..."
                inputProps={{
                  "aria-label": "search for books",
                  ref: searchInput,
                }}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <BookScroll
              count={count}
              next={() => {}}
              hasMore={false}
              books={books}
            />
          </Container>
        )}
      </main>
    </>
  )
}

export default BooksFavoritesPage
