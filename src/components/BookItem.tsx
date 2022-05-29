import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material"
import Link from "next/link"
import { IBook } from "../types/apiTypes"

interface BookItemProps {
  book: IBook
}

function BookItem({
  book: { id, title, description, resources, agents },
}: BookItemProps) {
  return (
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
            .find((r) => r.uri.includes("medium"))?.uri ??
          "https://source.unsplash.com/random"
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
        <Button size="small">View</Button>
        <Link href={`/book/${id}`}>
          <Button size="small">Read</Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default BookItem
