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
  search?: string
  type?: string
  languages?: string
  title_contains?: string
  description_contains?: string
  downloads_range_min?: number
  downloads_range_max?: number
  has_bookshelf?: string
  has_resource_type?: string
  has_agent_type?: string
  agent_name_contains?: string
  agent_alias_contains?: string
  agent_webpage_contains?: string
  agent_birth_date_range_min?: string
  agent_birth_date_range_max?: string
  agent_death_date_range_min?: string
  agent_death_date_range_max?: string
  page?: number
}
