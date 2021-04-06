import React, {useState, useEffect} from "react"
import {Dialog, DialogTitle, DialogContent, Fade, Typography, Grid} from "@material-ui/core"
import {ReactComponent as SmallDiceIcon} from "../resources/svg/role-playing_red.svg"
import { AttributeTemplate } from "../models/Shared";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function RollDiceDialog(props : Props){

  const dice = props.dice ? props.dice : "d20"
  
  const diceNumber = parseInt(dice.substring(1))
  const [value, setValue] = useState()

  useEffect(()=>{
    if(props.open && !value){
      setValue(getRandomInt(1, diceNumber))
    } 
  },[props.open, diceNumber, value])

  function calculateSuccess(){
    if(props.expertise?.excellentSuccess && value >= props.expertise.excellentSuccess){
      return <Typography style={{fontSize: 24, fontWeight: 700}}> Sucesso extremo </Typography> 
    }
    if(props.expertise?.goodSuccess && value >= props.expertise.goodSuccess){
      return <Typography style={{fontSize: 24, fontWeight: 700}}> Sucesso bom </Typography> 
    }
    if(props.expertise?.normalSuccess && value >= props.expertise.normalSuccess){
      return <Typography style={{fontSize: 24, fontWeight: 700}}> Sucesso normal </Typography> 
    }
    if(value === 1){
      return <Typography style={{fontSize: 24, fontWeight: 700}}> Desastre </Typography>
    }
    else{
      return <Typography style={{fontSize: 24, fontWeight: 700}}> Falha </Typography>
    }

  }

  return <Dialog
  open={props.open}
  TransitionComponent={Transition}
  onClose={() => {props.handleClose(); setValue(undefined)} }
>
  <DialogTitle>{`Rodando ${dice}`}</DialogTitle>
  <DialogContent>
    <Grid container direction="column" justify="center" alignItems="center">
        <Grid item style={{position: "relative", width: 132, height: 132}}>
          <div style={{position: "absolute", top: 0, left: 0}}><SmallDiceIcon style={{height: 132, width: 132}}/></div>
          <div style={{position: "absolute", top:"41%", left: 0, width: "100%", textAlign:"center"}}>
            <Typography style={{fontSize: 22, fontWeight: 700}}>{value}</Typography>
          </div>
        </Grid>
        <Grid item>
          {calculateSuccess()}
        </Grid>
    </Grid>
  </DialogContent>
  
</Dialog>
}

interface Props{
  open: boolean,
  handleClose: () => void
  expertise: AttributeTemplate
  dice?: string,
}

export default RollDiceDialog