import React, {useState} from "react"
import {Grid, Typography, Divider} from "@material-ui/core"
import { CharacterModel, addNewWeapon, modifyWeapon, deleteWeapon } from "../models/CharacterModel"
import { WeaponModel } from "../models/WeaponModel"
import useStyles from "./CombatStyles"
import WeaponsDatagrid from "../components/WeaponsDatagrid"
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import NewWeaponDialog from "./components/NewWeaponDialog"
import { AttributeTemplate } from "../models/Shared"

function Combat(props: Props){
  const classes = useStyles()

  const [newWeaponDialogOpen, setNewWeaponDialgoOpen]= useState(false)

  return (
    <Grid container direction="column" alignItems="center" className={classes.container}>
      <NewWeaponDialog 
        open={newWeaponDialogOpen} 
        handleClose={()=>{setNewWeaponDialgoOpen(false)}}
        handleSend={(newWeapon) => {setNewWeaponDialgoOpen(false); props.modifyCharacter(addNewWeapon(props.character, newWeapon))}}
        />
      <Grid container direction="row" alignItems="center" justify="center" spacing={2}>
        <Grid item>
        <Typography style={{fontSize: 24, fontWeight: 700, color: "#FFF" }}> COMBATE </Typography>
        </Grid>
        <Grid item>
            <ControlPointIcon onClick={()=>{setNewWeaponDialgoOpen(true)}} style={{color: "#FFF", cursor: "pointer"}}/>
        </Grid>
        
      </Grid>
  
      <Grid item style={{width: "100%", paddingBottom: 12}}>
      <Divider style={{width: "100%", backgroundColor: "#FFF"}} />
      </Grid>
  
      <Grid container direction="row" item spacing={3} style={{paddingTop: 8}}>
        <WeaponsDatagrid 
          rows={props.weapons} 
          character={props.character}
          rollDice={props.rollDice}
          modifyWeapon={(newWeapon) => props.modifyCharacter(modifyWeapon(props.character, newWeapon))}
          deleteWeapon={(weaponName)=> props.modifyCharacter(deleteWeapon(props.character, weaponName))}/>
      </Grid>
    </Grid>)
}

interface Props{
  weapons: Array<WeaponModel>,
  character: CharacterModel,
  modifyCharacter: (newCharacter) => void,
  rollDice: (type: AttributeTemplate) => void}

export default Combat