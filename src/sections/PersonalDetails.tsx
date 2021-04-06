import React from "react"
import {Grid, Typography} from "@material-ui/core"
import CustomTextField from "../components/CustomTextField"
import {CharacterModel} from "../models/CharacterModel"
import useStyles from "./PersonalDetailsStyles"

function PersonalDetails(props : Props){
  const classes = useStyles()

  return (
    <Grid container direction="column" spacing={2} className={classes.container}>
      <Grid item>
        <Typography style={{fontWeight: 800, fontSize: 24, color: "#FFF"}}>
          Detalhes Pessoais
        </Typography>
      </Grid>


      <Grid item>
       <CustomTextField name="Nome" value={props.name} changeValue={(newName)=>{props.modifyCharacter({...props.character, name: newName})}}/>
      </Grid>

      <Grid item>
       <CustomTextField name="Jogador" value={props.player} changeValue={(newName)=>{props.modifyCharacter({...props.character, player: newName})}}/>
      </Grid>

      <Grid item>
       <CustomTextField name="Ocupação" value={props.occupation} changeValue={(newName)=>{props.modifyCharacter({...props.character, occupation: newName})}}/>
      </Grid>

      <Grid item>
       <CustomTextField name="Idade" value={props.age} changeValue={(newName)=>{props.modifyCharacter({...props.character, age: newName})}}/>
      </Grid>

      <Grid item>
       <CustomTextField name="Sexo" value={props.gender} changeValue={(newName)=>{props.modifyCharacter({...props.character, gender: newName})}}/>
      </Grid>

    </Grid>
    )

}
interface Props{
  name: string,
  player: string,
  occupation: string,
  age: number,
  gender: string,
  character: CharacterModel,
  modifyCharacter: (newCharacter) => void
}

export default PersonalDetails

