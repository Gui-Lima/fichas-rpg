import React from "react"
import {Grid, IconButton, TextField, Typography} from "@material-ui/core"
import {ReactComponent as SmallDiceIcon} from "../resources/svg/role-playing_red.svg"
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import useStyles from "./AttributeTextFieldStyles"
import { AttributeTemplate } from "../models/Shared";
import { CharacterModel } from "../models/CharacterModel";

function AttributeTextfield(props: Props){

  const classes = useStyles()

  const rollDice = props.rollDice ? props.rollDice : (any : any) => {}

  return (
    <Grid container direction="column" alignItems="center" justify="center" style={{borderRadius: 4, borderStyle: "solid", borderWidth: 1, borderColor: "#FFF", paddingRight: 8, paddingLeft: 8, paddingTop:3, paddingBottom: 3, height: "100%", position: "relative"}}>
      {props.hasStar &&  
      <div style={{position:"absolute", top: -10, left: "90%"}}>
        <IconButton classes={{root: classes.iconButtonRoot}} onClick={props.changeFavourite} >
          {props.isFavourite ? <StarIcon classes={{root: classes.svgRoot}}/> : <StarBorderIcon classes={{root: classes.svgRoot}}/>}
        </IconButton>  
      </div>}
     

      {props.hasDice &&
      <Grid item>
        <SmallDiceIcon style={{height: 28, width: 28, cursor: "pointer", paddingLeft: 5}} onClick={() => {rollDice(props.attribute)}}/>
      </Grid>}
      <Grid item>
        <Typography style={{fontWeight: 700, fontSize: 16, color: "#FFF", textAlign: "center"}}>
          {props.attribute.name}
        </Typography>
      </Grid>
      <Grid item>
      <TextField 
          fullWidth 
          value={props.attribute.current} 
          onChange={(e) => props.changeValue(e.target.value)} 
          inputProps={{style: {color: "#FFF", fontSize: 26,  minHeight: 25, paddingBottom: 0, textAlign: "center"}}}
          />
      </Grid>
    </Grid>
    
  )
}

interface Props{
  attribute: AttributeTemplate,
  changeValue: (newValue:number) => void,
  rollDice?: (type: AttributeTemplate) => void,
  character?: CharacterModel
  changeFavourite?: () => void,
  hasDice?: boolean,
  isFavourite?: boolean,
  hasStar?: boolean,
}

export default AttributeTextfield