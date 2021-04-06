import React, {useState} from "react"
import {Divider, Grid, Typography} from "@material-ui/core"
import { AttributeModel } from "../models/Attribute"
import useStyles from "./AttributesStyles"
import { AttributeTypes } from "../constants/Attributes"
import AttributeTextfield from "../components/AttributeTextfield"
import {AttributeTemplate, changeAttribute, getAttributeByType} from "../models/Shared"
import { CharacterModel } from "../models/CharacterModel"

function Attributes(props: Props){
  const classes = useStyles()

  const [minimized, setMinimized] = useState(false)

  function listAttributes() {
    const attributes : Array<string> = []
    for (const attr in AttributeTypes ){
      attributes.push(attr)
    }
    return attributes
  }

  return (
  <Grid container direction="column" alignItems="center" className={classes.container} style={minimized ? {maxHeight: 70, overflow:"hidden"} : {}}>
    <Grid item>
      <Typography style={{fontSize: 24, fontWeight: 700, color: "#FFF", cursor: "pointer" }} onClick={() => setMinimized(!minimized)}> ATRIBUTOS </Typography>
    </Grid>

    <Grid item style={{width: "100%", paddingBottom: 12}}>
    <Divider style={{width: "100%", backgroundColor: "#FFF"}} />
    </Grid>

    <Grid container direction="row" item spacing={3}>
      {listAttributes().map((attr, i)=>{
        return (
        <Grid key={`attr-${attr}-${i}`} item xs={4}> 
          <AttributeTextfield
          attribute={getAttributeByType(AttributeTypes[attr], props.character.attributes.attributes)}
          changeValue={(newValue) => {
            props.modifyCharacter({...props.character, attributes: {attributes: changeAttribute(AttributeTypes[attr], props.character.attributes.attributes, newValue)}})
            }}
          hasDice={AttributeTypes[attr] !== AttributeTypes.MOVEMENT && AttributeTypes[attr] !== AttributeTypes.BODY }
          rollDice={props.rollDice}
          character={props.character}
          />
        </Grid>
        )
        
      })}
    </Grid>
  </Grid>)
}


interface Props{
  attributes: AttributeModel,
  character: CharacterModel,
  modifyCharacter: (newCharacter) => void,
  rollDice: (type: AttributeTemplate) => void
}

export default Attributes