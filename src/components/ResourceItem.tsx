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
  Skeleton,
} from "@mui/material"
import { IResource } from "../types/api"
import { defineResourceMeta, IResourceMeta } from "../utils/bookResources"

interface ResourceItemProps {
  resource?: IResource
  onClick?: (r: IResource, m: IResourceMeta) => void
}

function ResourceItem({ resource, onClick = (r, m) => {} }: ResourceItemProps) {
  if (!resource)
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Skeleton
              height="100%"
              width="100%"
              variant="circular"
              animation="wave"
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" />}
          secondary={<Skeleton variant="text" />}
        />
      </ListItem>
    )

  const meta = defineResourceMeta(resource)

  const getActionIcon = (meta: IResourceMeta) => {
    if (meta.isEbook) return <Download />
    if (meta.isCover) return <ImageIcon />
    if (meta.isZip) return <Download />
    if (meta.type == "text/plain") return <ReadMore />
    if (meta.type == "text/html") return <ReadMore />
    return <InsertDriveFile />
  }

  const getAvatarIcon = (meta: IResourceMeta) => {
    if (meta.isEbook) return <Book />
    if (meta.isCover) return <ImageIcon />
    if (meta.isZip) return <FolderZip />
    if (meta.type == "text/plain") return <TextSnippet />
    if (meta.type == "text/html") return <Code />
    return <InsertDriveFile />
  }

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="action"
          onClick={() => onClick(resource, meta)}
        >
          {getActionIcon(meta)}
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>{getAvatarIcon(meta)}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={meta.type} secondary={resource.type} />
    </ListItem>
  )
}

export default ResourceItem
