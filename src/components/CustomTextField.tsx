import React from "react"
import { TextField } from "@material-ui/core"

function CustomTextField(props : Props){
  
  return (
    <TextField fullWidth label={props.name} value={props.value} onChange={(e) => props.changeValue(e.target.value)} InputLabelProps={{style : {color: "#FFF"}}} InputProps={{style: {color: "#FFF"}}}/>
  )
}

interface Props{
  name: string,
  value: string  | number,
  changeValue : (newValue : string) => void
}

export default CustomTextField