import { IBook, IBookFilters, IBookPage } from "../types/apiTypes"

const { NEXT_PUBLIC_BOOKS_API } = process.env

export async function fetchBook(id: number) {
  const response = await fetch(`${NEXT_PUBLIC_BOOKS_API}/book/${id}`)
  const book = (await response.json()) as IBook

  return book
}

export async function fetchBooks(filters?: IBookFilters) {
  let params = ""

  if (filters) {
    const filtersMap = new Map(Object.entries(filters))

    params = "?"
    filtersMap.forEach((v, k) => (params = params.concat(`${k}=${v}&`)))
    params = params.slice(0, -1)
  }

  const response = await fetch(`${NEXT_PUBLIC_BOOKS_API}/book${params}`)
  const bookPage = (await response.json()) as IBookPage

  return bookPage
}
