export interface ILanguage {
  name: string
}

export interface ILanguagePage {
  count: number
  next: string | null
  previous: string | null
  results: ILanguage[]
}
