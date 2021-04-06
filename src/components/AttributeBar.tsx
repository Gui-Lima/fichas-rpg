import React from "react"
import {Grid, Typography, FormControlLabel, Checkbox, TextField} from "@material-ui/core"
import {ReactComponent as SmallDiceIcon} from "../resources/svg/role-playing_red.svg"
import useStyles from "./AttributeBarStyles"
import { AttributeTemplate, getAttributeByType } from "../models/Shared"
import { ExpertiseTypes } from "../constants/Expertises"
import { CharacterModel } from "../models/CharacterModel"

function AttributeBar(props : Props){
  const classes = useStyles()

  const translateFactor = 100 -  ((props.currentValue /  props.totalValue) * 100)

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography style={{fontWeight: 700, fontSize: 16, color: "#FFF"}}>{props.name}</Typography>
      </Grid>

      <Grid container direction="row" item>
        <Grid item xs={props.hasDice ? 11 : 12}>
          <div style={{position: "relative", width:"100%", height:30, overflow: "hidden"}}>
            <div style={{position: "absolute", left:0, top:0, borderRadius: 3, backgroundColor: "#3E3C42", width:"100%", height:30, zIndex: 0}}>
            </div>

            <div style={{position: "absolute", left:0, top:0, borderRadius: 3, backgroundColor: props.color, width:"100%", height:30, zIndex: 1, transform: `translateX(-${translateFactor}%)`}}>
            </div>
      
            <Grid container direction="row" justify="center" alignItems="center" style={{position: "absolute", width:"100%", height:30, zIndex: 2}} >
              <Grid item style={{maxWidth: 35}}>
                <TextField value={props.currentValue} onChange={(e)=>{props.changeCurrentValue(e.target.value)}}
                InputProps={{style:{color: "#FFF", fontWeight: 800, fontSize:18}}}/>
              </Grid>
              <Grid item>
              <Typography style={{fontWeight: 800, fontSize: 18, color: "#FFF"}}>
                {`/ ${props.totalValue}`}
              </Typography>
              </Grid>
              
            </Grid>
        
          </div>
        </Grid>
        {props.hasDice &&
        <Grid item xs>
          <SmallDiceIcon style={{height: 28, width: 28, cursor: "pointer", paddingLeft: 5}} onClick={() => {if(props.rollDice) props.rollDice(getAttributeByType(ExpertiseTypes.OTHER_SIDE_EXPOSURE, props.character.expertises.expertises), "d100")}}/>
        </Grid>}
      </Grid>

      <Grid container direction="row" justify="space-evenly" spacing={2} item>
        {props.checkBoxes?.boxes.map ((checkBox, i)=> {
          return ( 
            <Grid key={`${checkBox.name}-${i}`} item> 
                <FormControlLabel
                control={
                  <Checkbox
                    checked={checkBox.activated}
                    onChange={() => {props.checkBoxes?.changeBox(checkBox.name)}}
                    name={checkBox.displayName}
                    classes={{root: classes.checkBoxroot, checked: classes.checked}}
                  />
                }
                label={checkBox.displayName}
                classes={{root: classes.checkBoxroot}}
              />
            </Grid>
            )
        })}
      </Grid>
    </Grid>
  )

}

interface Props {
  name: string,
  totalValue: number,
  currentValue: number,
  color: string,
  hasDice?: boolean,
  changeCurrentValue: (newValue : number) => void,
  checkBoxes? : { boxes: Array<{name:string, displayName: string, activated: boolean}>, 
                  changeBox:(name : string) => void
                },
  character: CharacterModel,
  rollDice?: (type: AttributeTemplate, dice: string) => void
}

export default AttributeBar