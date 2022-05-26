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

export interface FiltersDialogProps {
  open: boolean
  onClose: () => void
  onApply: (filters: any) => void
}

function FiltersDialog(props: FiltersDialogProps) {
  const { onClose, onApply, open } = props

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Provide details to search...</DialogTitle>
      <DialogContent>
        <FormControl sx={{ my: 1 }} fullWidth>
          <TextField label="Type" />
        </FormControl>

        <FormControl sx={{ my: 1 }} fullWidth>
          <InputLabel>Language</InputLabel>
          <Select label="Language">
            <MenuItem value="">All</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ my: 1 }} fullWidth>
          <TextField label="Title contains" />
        </FormControl>

        <FormControl sx={{ my: 1 }} fullWidth>
          <TextField label="Description contains" />
        </FormControl>

        <Stack direction="row">
          <FormControl sx={{ my: 1, mr: 1 }} fullWidth>
            <TextField label="Downloaded more then..." />
          </FormControl>
          <FormControl sx={{ my: 1 }} fullWidth>
            <TextField label="Downloaded less then..." />
          </FormControl>
        </Stack>

        <FormControl sx={{ my: 1 }} fullWidth>
          <TextField label="Bookshelves name" />
        </FormControl>

        <FormControl sx={{ my: 1 }} fullWidth>
          <TextField label="Resources type" />
        </FormControl>

        <FormControl sx={{ my: 1 }} fullWidth>
          <TextField label="Agents type" />
        </FormControl>

        <FormControl sx={{ my: 1 }} fullWidth>
          <TextField label="Agents person name contains" />
        </FormControl>

        <FormControl sx={{ my: 1 }} fullWidth>
          <TextField label="Agents person alias contains" />
        </FormControl>

        <FormControl sx={{ my: 1 }} fullWidth>
          <TextField label="Agents person webpage contains" />
        </FormControl>

        <Stack direction="row">
          <FormControl sx={{ my: 1, mr: 1 }} fullWidth>
            <TextField label="Agents birth date is higher then" />
          </FormControl>
          <FormControl sx={{ my: 1 }} fullWidth>
            <TextField label="Agents birth date is lower then" />
          </FormControl>
        </Stack>

        <Stack direction="row">
          <FormControl sx={{ my: 1, mr: 1 }} fullWidth>
            <TextField label="Agents death date is higher then" />
          </FormControl>
          <FormControl sx={{ my: 1 }} fullWidth>
            <TextField label="Agents death date is lower then" />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onApply({})}>Apply</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FiltersDialog
