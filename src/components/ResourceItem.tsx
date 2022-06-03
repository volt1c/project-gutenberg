import {
  Download,
  ReadMore,
  InsertDriveFile,
  Book,
  FolderZip,
  TextSnippet,
  Code,
  Image as ImageIcon,
} from "@mui/icons-material"
import {
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material"
import { IResource } from "../types/api"
import { defineResourceMeta, IResourceMeta } from "../utils/bookResources"

interface ResourceItemProps {
  resource: IResource
  onClick: (r: IResource, m: IResourceMeta) => void
}

function ResourceItem({ resource, onClick }: ResourceItemProps) {
  const meta = defineResourceMeta(resource)
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => onClick(resource, meta)}
        >
          {meta.isEbook ? (
            <Download />
          ) : meta.isCover ? (
            <ImageIcon />
          ) : meta.isZip ? (
            <Download />
          ) : meta.type == "text/plain" ? (
            <ReadMore />
          ) : meta.type == "text/html" ? (
            <ReadMore />
          ) : (
            <InsertDriveFile />
          )}
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          {meta.isEbook ? (
            <Book />
          ) : meta.isCover ? (
            <ImageIcon />
          ) : meta.isZip ? (
            <FolderZip />
          ) : meta.type == "text/plain" ? (
            <TextSnippet />
          ) : meta.type == "text/html" ? (
            <Code />
          ) : (
            <InsertDriveFile />
          )}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={meta.type} secondary={resource.type} />
    </ListItem>
  )
}

export default ResourceItem
