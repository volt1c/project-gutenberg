export interface IAgent {
  id: number
  person: string
  type: string
}

export interface IResource {
  id: number
  uri: string
  type: string
}

export interface IBook {
  id: number
  type: string
  title: string
  description: string | null
  downloads: number
  license: string
  subjects: string[]
  bookshelves: any[]
  languages: string[]
  agents: IAgent[]
  resources: IResource[]
}

export interface IBookPage {
  count: number
  next: string | null
  previous: string | null
  results: IBook[]
}

export interface IBookFilters {
  type?: string
  languages?: string
  title_contains?: string
  description_contains?: string
  downloads_range_min?: number
  downloads_range_max?: number
  has_bookshelf?: string
  page?: number
}
