import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material"
import Link from "next/link"
import { useState } from "react"
import { IBook } from "../types/api"
import { findWebsiteResource } from "../utils/bookResources"
import ReadDialog from "./ReadDialog"

interface BookItemProps {
  book: IBook
}

function BookItem({
  book: { id, title, description, resources, agents },
}: BookItemProps) {
  const [open, setOpen] = useState(false)
  const [src, setSrc] = useState<string>()

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          sx={{
            objectFit: "contain",
            maxHeight: "640px",
          }}
          component="img"
          image={
            resources
              .filter((r) => r.type.includes("image/jpeg"))
              .find((r) => r.uri.includes("medium"))?.uri ?? "/bookcover.jpg"
          }
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography>{description}</Typography>
          <Typography variant="caption">
            {agents.map((a) => a.person).join(", ")}
          </Typography>
        </CardContent>
        <CardActions>
          <Link href={`/book/${id}`}>
            <Button size="small">View</Button>
          </Link>
          <Button
            size="small"
            onClick={() => {
              if (!src) setSrc(findWebsiteResource(resources ?? [])?.uri ?? "")
              setOpen(true)
            }}
          >
            Read
          </Button>
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
