export enum ResultType {
  None = "none",
  Error = "error",
  Warning = "warning",
  Info = "info",
  Success = "success",
}

export interface IAuthResult {
  type: ResultType
  content: string
}
