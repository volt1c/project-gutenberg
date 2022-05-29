import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  TextField,
  Stack,
} from "@mui/material"
import { IBookFilters } from "../types/apiTypes"

export interface FiltersDialogProps {
  open: boolean
  onClose: () => void
  onApply: (filters: any) => void
  defaultFilters?: IBookFilters
}

function FiltersDialog({
  onClose,
  onApply,
  open,
  defaultFilters,
}: FiltersDialogProps) {
  return (
    <Dialog onClose={onClose} open={open} scroll="body">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const data = new FormData(e.currentTarget)

          const f: any = {}

          data.forEach((v, k) => v != "" && (f[k] = v))
          console.log(f)

          onApply(f as IBookFilters)
        }}
      >
        <DialogTitle>Provide details to search...</DialogTitle>
        <DialogContent>
          <FormControl sx={{ my: 1 }} fullWidth>
            <TextField
              label="Type"
              name="type"
              defaultValue={defaultFilters?.type ?? ""}
            />
          </FormControl>

          <FormControl sx={{ my: 1 }} fullWidth>
            <InputLabel>Language</InputLabel>
            <Select
              label="Language"
              name="languages"
              defaultValue={defaultFilters?.languages ?? ""}
            >
              <MenuItem value="">All</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ my: 1 }} fullWidth>
            <TextField
              name="title_contains"
              label="Title contains"
              defaultValue={defaultFilters?.title_contains ?? ""}
            />
          </FormControl>

          <FormControl sx={{ my: 1 }} fullWidth>
            <TextField
              label="Description contains"
              name="description_contains"
              defaultValue={defaultFilters?.description_contains ?? ""}
            />
          </FormControl>

          <Stack direction="row">
            <FormControl sx={{ my: 1, mr: 1 }} fullWidth>
              <TextField
                label="Downloaded more then..."
                name="downloads_range_min"
                defaultValue={defaultFilters?.downloads_range_min ?? ""}
              />
            </FormControl>
            <FormControl sx={{ my: 1 }} fullWidth>
              <TextField
                label="Downloaded less then..."
                name="downloads_range_max"
                defaultValue={defaultFilters?.downloads_range_max ?? ""}
              />
            </FormControl>
          </Stack>

          <FormControl sx={{ my: 1 }} fullWidth>
            <TextField
              label="Bookshelves name"
              name="has_bookshelf"
              defaultValue={defaultFilters?.has_bookshelf ?? ""}
            />
          </FormControl>

          <FormControl sx={{ my: 1 }} fullWidth>
            <TextField
              label="Resources type"
              name="has_resource_type"
              defaultValue={defaultFilters?.has_resource_type ?? ""}
            />
          </FormControl>

          <FormControl sx={{ my: 1 }} fullWidth>
            <TextField
              label="Agents type"
              name="has_agent_type"
              defaultValue={defaultFilters?.has_agent_type ?? ""}
            />
          </FormControl>

          <FormControl sx={{ my: 1 }} fullWidth>
            <TextField
              label="Agents person name contains"
              name="agent_name_contains"
              defaultValue={defaultFilters?.agent_name_contains ?? ""}
            />
          </FormControl>

          <FormControl sx={{ my: 1 }} fullWidth>
            <TextField
              label="Agents person alias contains"
              name="agent_alias_contains"
              defaultValue={defaultFilters?.agent_alias_contains ?? ""}
            />
          </FormControl>

          <FormControl sx={{ my: 1 }} fullWidth>
            <TextField
              label="Agents person webpage contains"
              name="agent_webpage_contains"
              defaultValue={defaultFilters?.agent_webpage_contains ?? ""}
            />
          </FormControl>

          <Stack direction="row">
            <FormControl sx={{ my: 1, mr: 1 }} fullWidth>
              <TextField
                label="Agents birth date is higher then"
                name="agent_birth_date_range_min"
                defaultValue={defaultFilters?.agent_birth_date_range_min ?? ""}
              />
            </FormControl>
            <FormControl sx={{ my: 1 }} fullWidth>
              <TextField
                label="Agents birth date is lower then"
                name="agent_birth_date_range_max"
                defaultValue={defaultFilters?.agent_birth_date_range_max ?? ""}
              />
            </FormControl>
          </Stack>

          <Stack direction="row">
            <FormControl sx={{ my: 1, mr: 1 }} fullWidth>
              <TextField
                label="Agents death date is higher then"
                name="agent_death_date_range_min"
                defaultValue={defaultFilters?.agent_death_date_range_min ?? ""}
              />
            </FormControl>
            <FormControl sx={{ my: 1 }} fullWidth>
              <TextField
                label="Agents death date is lower then"
                name="agent_death_date_range_max"
                defaultValue={defaultFilters?.agent_death_date_range_max ?? ""}
              />
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Apply</Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default FiltersDialog
