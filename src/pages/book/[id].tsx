import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import {
  Book,
  Code,
  Delete,
  Folder,
  Image,
  InsertDriveFile,
  Star,
  TextSnippet,
} from "@mui/icons-material"
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { IBook } from "../../types/apiTypes"
import { fetchBook } from "../../utils/fetchApi"
import { defineResourceMeta } from "../../utils/bookResources"

function BookIdPage() {
  const router = useRouter()
  const { id } = router.query

  const [book, setBook] = useState<IBook>()

  useEffect(() => {
    if (typeof id == "string") {
      const bookId = parseInt(id)
      console.log("fetch...")
      fetchBook(bookId).then((b) => setBook(b))
    }
  }, [])

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
    <main>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <img src={cover ?? "/bookcover.jpg"} />
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {book?.title}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            {book?.description ?? "no description :<"}
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button onClick={() => console.log("open read dialog")}>
              Read
            </Button>
            <IconButton onClick={() => console.log("add to favorites")}>
              <Star />
            </IconButton>
          </Stack>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Resources
            </Typography>
            <List>
              {book?.resources.map((r, idx) => {
                const meta = defineResourceMeta(r)
                return (
                  <ListItem
                    key={idx}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <Delete />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        {meta.isEbook ? (
                          <Book />
                        ) : meta.isCover ? (
                          <Image />
                        ) : meta.isZip ? (
                          <Folder />
                        ) : meta.type == "text/plain" ? (
                          <TextSnippet />
                        ) : meta.type == "text/html" ? (
                          <Code />
                        ) : (
                          <InsertDriveFile />
                        )}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={meta.type} secondary={r.type} />
                  </ListItem>
                )
              })}
            </List>
          </Grid>
        </Container>
      </Box>
    </main>
  )
}

export default BookIdPage
