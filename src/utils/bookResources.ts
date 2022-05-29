import { IResource } from "../types/apiTypes"

export interface IResourceMeta {
  type: ResourceType
  isZip: boolean
  isEbook: boolean
  isCover: boolean
  hasImages?: boolean
  imageSize?: ImageSize
}

export enum ResourceType {
  Image = "image/jpeg",
  Html = "text/html",
  PlainText = "text/plain",
  Epub = "epub",
  Mobi = "x-mobipocket-ebook",
  Rdf = "rdf",
  Other = "",
}

export enum ImageSize {
  Small = "small",
  Medium = "medium",
}

export function defineResourceMeta(resource: IResource) {
  const meta: IResourceMeta = {
    type: ResourceType.Other,
    isZip: false,
    isEbook: false,
    isCover: false,
  }

  meta.type = Object.values(ResourceType).find(
    (v) => resource.type.includes(v) ?? ResourceType.Other
  ) as ResourceType

  meta.isZip = resource.uri.includes("zip")
  meta.isEbook = resource.uri.includes("ebook")
  meta.isCover = resource.uri.includes("cover")

  if (resource.uri.includes("images")) meta.hasImages = true
  if (resource.uri.includes("noimages")) meta.hasImages = false

  meta.imageSize = Object.values(ImageSize).find(
    (v) => resource.type.includes(v) ?? undefined
  ) as ImageSize | undefined

  return meta
}
