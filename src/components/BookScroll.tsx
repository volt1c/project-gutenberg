import { Grid, CircularProgress } from "@mui/material"
import InfiniteScroll from "react-infinite-scroll-component"
import { IBook } from "../types/api"
import BookItem from "./BookItem"

interface Props {
  next: () => void
  hasMore: boolean
  books: IBook[]
  count: number
}

function BookScroll({ next, hasMore, books, count }: Props) {
  return (
    <InfiniteScroll
      scrollThreshold={0.6}
      next={next}
      endMessage={
        count < 0 ? (
          <></>
        ) : (
          <div style={{ textAlign: "center", paddingTop: "50px" }}>
            {books.length < 1
              ? "😔 There is no such book... 😔"
              : "💪 Yay! You have seen it all 👍"}
          </div>
        )
      }
      hasMore={hasMore}
      loader={
        <Grid
          display="grid"
          sx={{ overflow: "hidden", placeItems: "center", paddingTop: "12px" }}
        >
          <CircularProgress />
        </Grid>
      }
      dataLength={books.length}
    >
      <Grid container spacing={4} columns={{ xs: 12, sm: 16, md: 20 }}>
        {[
          ...books,
          ...(count == -1 || hasMore
            ? Array(books.length < 10 && count !== -1 ? books.length : 10).fill(
                undefined
              )
            : []),
        ].map((book, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={4}>
            <BookItem book={book} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  )
}

export default BookScroll
