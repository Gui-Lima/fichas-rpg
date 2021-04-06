import React, {useState} from "react"
import { ExpertiseModel } from "../models/Expertise"
import {Divider, Grid, Typography} from "@material-ui/core"
import useStyles from "./ExpertiseStyles"
import { AttributeTypes } from "../constants/Attributes"
import AttributeTextfield from "../components/AttributeTextfield"
import {AttributeTemplate, changeAttribute} from "../models/Shared"
import { CharacterModel } from "../models/CharacterModel"

function ExpertiseShortcut(props : Props) {
  const classes = useStyles()

  const [minimized, setMinimized] = useState(false)

  return (
    <Grid container direction="column" alignItems="center" className={classes.container} style={minimized ? {maxHeight: 70, overflow:"hidden"} : {}}>
      <Grid container direction="row" alignItems="center" justify="center" item>
        <Grid item style={{paddingRight: 5}}>
          <Typography style={{fontSize: 24, fontWeight: 700, color: "#FFF", cursor: "pointer" }} onClick={()=>{setMinimized(!minimized)}}> PERÍCIAS </Typography>
        </Grid>
        <Grid item>
        <Typography style={{fontSize: 14, fontWeight: 700, color: "#FFF" }}> (atalho) </Typography>
        </Grid>
      </Grid>
  
      <Grid item style={{width: "100%", paddingBottom: 12}}>
      <Divider style={{width: "100%", backgroundColor: "#FFF"}} />
      </Grid>
  
      <Grid container direction="row" item spacing={3}>
        {props.expertises.expertises.filter((expert) => {return expert.isFavourite}).map((expert, i)=>{
          return (
            <Grid key={`attr-${expert}-${i}`} item xs={4}> 
            <AttributeTextfield 
              attribute={expert} 
              changeValue={(newValue) => {
                props.modifyCharacter({...props.character, expertises: {expertises: changeAttribute(expert.type, props.character.expertises.expertises, newValue)}})
                }}
              hasDice={expert.type !== AttributeTypes.MOVEMENT && expert.type !== AttributeTypes.BODY }
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


export default ExpertiseShortcut