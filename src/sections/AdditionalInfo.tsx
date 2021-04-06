import React, {useState} from "react"
import {Grid, Typography, Divider, TextField} from "@material-ui/core"
import { AdditionalInfoModel } from "../models/AdditionalInfoModel"
import { CharacterModel } from "../models/CharacterModel"
import useStyles from "./AdditionalInfoStyles"

function AdditionalInfo(props : Props){
  const classes = useStyles()
  const [minimized, setMinimized] = useState(false)

  return (
    <Grid container direction="column" alignItems="center" className={classes.container} style={minimized ? {maxHeight: 70, overflow:"hidden"} : {}}>
      <Grid item>
        <Typography style={{fontSize: 24, fontWeight: 700, color: "#FFF", cursor: "pointer" }} onClick={() => setMinimized(!minimized)}> INFO </Typography>
      </Grid>
  
      <Grid item style={{width: "100%", paddingBottom: 12}}>
      <Divider style={{width: "100%", backgroundColor: "#FFF"}} />
      </Grid>

      <Grid item style={{width: "100%", paddingBottom: 15}}>
        <TextField
        fullWidth
          label="Pessoas importantes"
          multiline
          rows={3}
          rowsMax={5}
          value={props.info.significantOthers}
          onChange={(e) => props.modifyCharacter({...props.character, additionalInfo: {...props.character.additionalInfo, significantOthers: e.target.value}})}
          inputProps={{style: {color: "#FFF", fontSize: 18,  minHeight: 25, paddingBottom: 0}}}
          InputLabelProps={{style: {color: "#FFF"}}}
          variant="filled"
        />
      </Grid>

      <Grid item style={{width: "100%"}}>
      <TextField
          fullWidth
          label="Notas"
          multiline
          rows={5}
          rowsMax={6}
          value={props.info.notes}
          onChange={(e) => props.modifyCharacter({...props.character, additionalInfo: {...props.character.additionalInfo, notes: e.target.value}})}
          inputProps={{style: {color: "#FFF", fontSize: 18,  minHeight: 25, paddingBottom: 0}}}
          InputLabelProps={{style: {color: "#FFF"}}}
          variant="filled"
        />
      </Grid>
  
    
    </Grid>)}


interface Props{
  info: AdditionalInfoModel,
  character: CharacterModel,
  modifyCharacter: (newCharacter) => void
}

export default AdditionalInfo