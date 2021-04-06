import React, {useState} from "react"
import { ExpertiseModel } from "../models/Expertise"
import {Divider, Grid, TextField, Typography} from "@material-ui/core"
import useStyles from "./ExpertiseStyles"
import AttributeTextfield from "../components/AttributeTextfield"
import {AttributeTemplate, changeAttribute, getAttributeByType, getFavourite, toggleFavourite} from "../models/Shared"
import { CharacterModel } from "../models/CharacterModel"
import {getName} from "../models/Shared"
import { ExpertiseTypes } from "../constants/Expertises"

function Expertises(props : Props) {
  const classes = useStyles()
  const [searchString, setSearchString] = useState("")
  const [minimized, setMinimized] = useState(false)

  function listExpertises() {
    const attributes : Array<string> = []
    for (const attr in ExpertiseTypes ){
      attributes.push(attr)
    }
    return attributes
  }

  return (
    <Grid container direction="column" alignItems="center" className={classes.container} style={minimized ? {maxHeight: 70, overflow:"hidden"} : {}}>
      <Grid container direction="row" alignItems="center" justify="center" item style={{paddingBottom: 8}}>
        <Grid item style={{paddingRight: 5}} xs={9}>
          <Typography style={{fontSize: 24, fontWeight: 700, color: "#FFF", cursor:"pointer" }} onClick={()=>setMinimized(!minimized)}> PERÍCIAS </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField size="small" fullWidth variant="outlined" value={searchString} label="Procurar Perícia" margin="none"
          InputLabelProps={{style: {color : "#FFF"}}}
          inputProps={{style: {color: "#FFF", borderColor: "#FFF", borderStyle: "solid", borderWidth:1, borderRadius: 4}}}
          onChange={(e)=>{setSearchString(e.target.value)}}/>
        </Grid>
      </Grid>
  
      <Grid item style={{width: "100%", paddingBottom: 12}}>
      <Divider style={{width: "100%", backgroundColor: "#FFF"}} />
      </Grid>
  
      <Grid container direction="row" item spacing={3}>
        {listExpertises().filter((expert) => {return getName(ExpertiseTypes[expert]).includes(searchString)}).map((expert, i)=>{
          return (
            <Grid key={`attr-${expert}-${i}`} item xs={2}> 
              <AttributeTextfield
              hasStar
              isFavourite={getFavourite(ExpertiseTypes[expert], props.character.expertises.expertises)}
              attribute={getAttributeByType(ExpertiseTypes[expert], props.character.expertises.expertises)}
              changeValue={(newValue) => {
                props.modifyCharacter({...props.character, expertises: {expertises: changeAttribute(ExpertiseTypes[expert], props.character.expertises.expertises, newValue)}})
                }}
                changeFavourite={()=>{
                  props.modifyCharacter({...props.character, expertises: {expertises: toggleFavourite(ExpertiseTypes[expert], props.character.expertises.expertises)}})
                }}
              hasDice
              character={props.character}
              rollDice={props.rollDice}/>
            </Grid>
            )
        })}
      </Grid>
    </Grid>)
}

interface Props{
  expertises : ExpertiseModel,
  character: CharacterModel,
  modifyCharacter: (newCharacter) => void,
  rollDice: (type: AttributeTemplate) => void
}


export default Expertises