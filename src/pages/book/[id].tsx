import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { Star } from "@mui/icons-material"
import {
  Button,
  Card,
  CardMedia,
  Grid,
  IconButton,
  List,
  Skeleton,
} from "@mui/material"
import { Router, useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IBook } from "../../types/api/book"
import { fetchBook } from "../../utils/fetchApi"
import {
  defineResourceMeta,
  findWebsiteResource,
  ResourceType,
} from "../../utils/bookResources"
import ReadDialog from "../../components/ReadDialog"
import ResourceItem from "../../components/ResourceItem"
import Head from "next/head"
import { useAuthContext } from "../../contexts/AuthContext"
import {
  addFavoriteBook,
  deleteFavoriteBook,
  isFavorite,
} from "../../firebase/firestore"

function BookIdPage() {
  const router = useRouter()
  const { id } = router.query

  const [book, setBook] = useState<IBook>()
  const [open, setOpen] = useState(false)
  const [src, setSrc] = useState<string>("")
  const [isFav, setIsFav] = useState(false)

  const auth = useAuthContext()

  useEffect(() => {
    if (book && auth.user)
      isFavorite(auth.user.uid, book.id).then((b) => setIsFav(b))
  }, [auth.isReady, auth.user, book])

  useEffect(() => {
    if (!router.isReady) return

    if (typeof id == "string") {
      const bookId = parseInt(id)
      console.log("fetch...")
      fetchBook(bookId).then((b) => setBook(b))
    }
  }, [router.query])

  const cover = book?.resources
    .map((r) => ({
      resource: r,
      meta: defineResourceMeta(r),
    }))
    .find(({ meta }) => {
      console.log(meta)
      return meta.isCover && meta.imageSize == "medium"
    })?.resource.uri

  return (
    <>
      <Head>
        <title>Project Gutenberg | {book?.title ?? "..."}</title>
      </Head>

      <main>
        <Box
          sx={{
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Grid
              display="grid"
              gap=".75rem"
              gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
            >
              <Box gridColumn="span 1">
                <Card>
                  {book ? (
                    <CardMedia component="img" image={cover} />
                  ) : (
                    <Skeleton
                      height="564px"
                      animation="wave"
                      variant="rectangular"
                    />
                  )}
                </Card>
              </Box>
              <Box gridColumn={{ xs: "span 1", md: "span 2" }}>
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                  sx={{
                    "word-wrap": "break-word",
                  }}
                >
                  {book ? book?.title : <Skeleton animation="wave" />}
                </Typography>
                <Typography
                  component="p"
                  variant="body1"
                  align="center"
                  color="text.secondary"
                  paragraph
                  sx={{
                    "word-wrap": "break-word",
                  }}
                >
                  {book
                    ? book?.description ??
                      "Sorry bu there was no description so i decided to write this text you don't need to read this... Why are U steel reading this, you know that there is nothing interesting, so why are you reading this? I think you probably have too much time, go work or something..."
                    : Array(3)
                        .fill("")
                        .map((v, idx) => (
                          <Skeleton key={idx} animation="wave" />
                        ))}
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  {book ? (
                    <>
                      <Button
                        onClick={() => {
                          setSrc(
                            findWebsiteResource(book?.resources ?? [])?.uri ??
                              ""
                          )
                          setOpen(true)
                        }}
                      >
                        Read
                      </Button>
                      <IconButton
                        onClick={() => {
                          if (auth.user?.uid && book) {
                            ;(async () => {
                              if (isFav)
                                await deleteFavoriteBook(
                                  auth.user?.uid ?? "",
                                  book?.id
                                )
                              else
                                await addFavoriteBook(
                                  auth.user?.uid ?? "",
                                  book?.id
                                )
                              setIsFav(!isFav)
                            })()

                            return
                          }
                          router.push("/signin")
                        }}
                      >
                        <Star sx={{ fill: isFav ? "yellow" : "inherit" }} />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <Skeleton width={48} height={24} variant="text" />
                      <Skeleton variant="circular" width={24} height={24} />
                    </>
                  )}
                </Stack>
                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                  >
                    Resources
                  </Typography>
                  <List>
                    {(book?.resources ?? Array(10).fill(undefined)).map(
                      (r, idx) => (
                        <ResourceItem
                          key={idx}
                          resource={r}
                          onClick={(r, m) => {
                            if (
                              !m.isZip &&
                              (m.type == ResourceType.Html ||
                                m.type == ResourceType.PlainText)
                            ) {
                              setSrc(r.uri)
                              setOpen(true)
                            } else {
                              window.open(r.uri, "_blank")
                            }
                          }}
                        />
                      )
                    )}
                  </List>
                </Grid>
              </Box>
            </Grid>
          </Container>
        </Box>
        <ReadDialog open={open} onClose={() => setOpen(false)} bookSrc={src} />
      </main>
    </>
  )
}

export default BookIdPage
