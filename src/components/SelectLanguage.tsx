import { Select, SelectProps, MenuItem } from "@mui/material"
import { useEffect, useState } from "react"
import { ILanguage } from "../types/api/language"
import { fetchLanguages } from "../utils/fetchApi"

function SelectLanguage(props: SelectProps) {
  const [langs, setLangs] = useState<ILanguage[]>()
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    setDisabled(true)
    fetchLanguages().then((l) => {
      setLangs(l)
      setDisabled(false)
    })
  }, [])

  return (
    <Select
      label="Language"
      name="languages"
      disabled={disabled}
      defaultValue={props.defaultValue ?? ""}
      {...props}
    >
      <MenuItem value="">All</MenuItem>
      {langs?.map(({ name }, idx) => (
        <MenuItem key={idx} value={name}>
          {`${name[0].toUpperCase()}${name.slice(1)}`}
        </MenuItem>
      ))}
    </Select>
  )
}

export default SelectLanguage
