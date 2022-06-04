import { IBook, IBookFilters, IBookPage } from "../types/api/book"
import { ILanguage, ILanguagePage } from "../types/api/language"

const { NEXT_PUBLIC_BOOKS_API } = process.env

const defaultDescription =
  "Sorry but there was no description so I decided to write this text, you don't have to read this ... why are you still reading this, you know there's nothing interesting here, so why don't you stop? I think you probably have too much time, go to work or take a walk ..."

export async function fetchBook(id: number) {
  const response = await fetch(`${NEXT_PUBLIC_BOOKS_API}/book/${id}`)
  const book = (await response.json()) as IBook

  if (!book.description) book.description = defaultDescription
  return book
}

export async function fetchBooksWithFilters(filters?: IBookFilters) {
  let params = ""

  if (filters) {
    const filtersMap = new Map(Object.entries(filters))

    params = "?"
    filtersMap.forEach((v, k) => (params = params.concat(`${k}=${v}&`)))
    params = params.slice(0, -1)
  }

  const response = await fetch(`${NEXT_PUBLIC_BOOKS_API}/book${params}`)
  const bookPage = (await response.json()) as IBookPage

  bookPage.results = bookPage.results.map((r) => {
    if (!r.description) r.description = defaultDescription
    return r
  })

  return bookPage
}

export async function fetchLanguages() {
  let langs: ILanguage[] = []
  let next: string | null = `${NEXT_PUBLIC_BOOKS_API}/language/`

  do {
    const langsPage = (await (await fetch(next)).json()) as ILanguagePage
    langs = [...langs, ...langsPage.results]
    next = langsPage.next
  } while (next !== null)

  return langs
}

export async function fetchBooksByIds(
  ids: number[],
  valid?: (book: IBook) => boolean
) {
  const books = []
  for (let i = 0; i < ids.length; i++) {
    const book = await fetchBook(ids[i])
    if (valid ? valid(book) : true) books.push(book)
  }
  return books
}
