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
