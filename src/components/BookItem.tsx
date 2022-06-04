import { Star } from "@mui/icons-material"
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  IconButton,
  Skeleton,
} from "@mui/material"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"
import {
  addFavoriteBook,
  deleteFavoriteBook,
  isFavorite,
} from "../firebase/firestore"
import { IBook } from "../types/api"
import { findWebsiteResource } from "../utils/bookResources"
import ReadDialog from "./ReadDialog"
import Router from "next/router"

interface BookItemProps {
  book?: IBook
}

function BookItem({ book }: BookItemProps) {
  const [open, setOpen] = useState(false)
  const [src, setSrc] = useState<string>()
  const [isFav, setIsFav] = useState(false)

  const auth = useAuthContext()

  useEffect(() => {
    if (book && auth.user)
      isFavorite(auth.user.uid, book.id).then((b) => setIsFav(b))
  }, [auth.isReady, auth.user, book])

  const short = (str: string, newLen: number, end = "...") =>
    str.length > newLen ? str.slice(0, newLen) + end : str

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {book ? (
          <CardMedia
            sx={{
              objectFit: "cover",
              height: "425px",
            }}
            component="img"
            image={
              book?.resources
                .filter((r) => r.type.includes("image/jpeg"))
                .find((r) => r.uri.includes("medium"))?.uri ?? "/bookcover.jpg"
            }
            alt="random"
          />
        ) : (
          <Skeleton height="425px" animation="wave" variant="rectangular" />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {book ? short(book?.title, 60) : <Skeleton />}
          </Typography>
          <Typography>
            {book ? (
              short(book?.description ?? "No description", 120)
            ) : (
              <Skeleton />
            )}
          </Typography>
          <Typography variant="caption" component="p">
            {book ? (
              short(book?.agents.map((a) => a.person).join(", "), 60)
            ) : (
              <Skeleton />
            )}
          </Typography>
        </CardContent>
        <CardActions>
          {book ? (
            <>
              <Link href={`/book/${book?.id}`}>
                <Button size="small">View</Button>
              </Link>
              <Button
                size="small"
                onClick={() => {
                  if (!src)
                    setSrc(
                      findWebsiteResource(book?.resources ?? [])?.uri ?? ""
                    )
                  setOpen(true)
                }}
              >
                Read
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                onClick={() => {
                  if (auth.user?.uid && book) {
                    ;(async () => {
                      if (isFav)
                        await deleteFavoriteBook(auth.user?.uid ?? "", book?.id)
                      else await addFavoriteBook(auth.user?.uid ?? "", book?.id)
                      setIsFav(!isFav)
                    })()

                    return
                  }
                  Router.push("/signin")
                }}
              >
                <Star sx={{ fill: isFav ? "yellow" : "inherit" }} />
              </IconButton>
            </>
          ) : (
            <>
              <Skeleton width="54px" height="23px" />
              <Skeleton width="54px" height="23px" />
              <Box sx={{ flexGrow: 1 }} />
              <Skeleton variant="circular" width="24px" height="24px" />
            </>
          )}
        </CardActions>
      </Card>
      <ReadDialog
        open={open}
        onClose={() => setOpen(false)}
        bookSrc={src ?? ""}
      />
    </>
  )
}

export default BookItem
