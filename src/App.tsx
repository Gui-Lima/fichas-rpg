import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Grid} from "@material-ui/core"
import PersonalDetails from './sections/PersonalDetails';
import Character from "./sections/Character"
import Attributes from './sections/Attributes';
import Expertise from './sections/Expertise';
import { createCharacter } from './models/Character';
import { AttributeTemplate, createAttribute } from './models/Shared';
import {AttributeTypes} from "./constants/Attributes"
import {ExpertiseTypes} from "./constants/Expertises"
import {getAttribute} from "./models/Shared"
import useStyles from "./AppStyles"

function App() {
  const classes = useStyles()

  const attributes = 
  { 
    attributes : [
      createAttribute("Força", 20, 16, 10, AttributeTypes.POWER), 
      createAttribute("Destreza", 20, 16, 12, AttributeTypes.DEXTERITY)
  ]}

  const expertises = 
  { expertises: [
    createAttribute("Arqueologia", 20, 16, 10, ExpertiseTypes.ARCHEOLOGY), 
    createAttribute("Charme", 20, 16, 12, ExpertiseTypes.CHARM)
  ] }

  const personagem = createCharacter("Anderson", "Filzao", "Uber", 24, attributes, expertises)

  return (
    <Grid container direction="column" className={classes.container}>

      <Grid container direction="row" item>
        <Button variant="outlined" color="primary" onClick={()=>{}}>Importar Ficha</Button>
      </Grid>

      <Grid container direction="row" item>
        <Grid item xs>
          <PersonalDetails name={personagem.name} player={personagem.player} occupation={personagem.occupation} age={personagem.age} />
        </Grid>
        <Grid item xs>
          <Character life={personagem.life} sanity={personagem.sanity} status={personagem.status} body={getAttribute(AttributeTypes.BODY ,personagem.attributes.attributes) > 0}/>
        </Grid>
      </Grid>



      <Grid containrer direction="row" item>
        <Grid item xs> 
          <Attributes attributes={personagem.attributes}/>
        </Grid>
        <Grid item xs>
          <Expertise expertises={personagem.expertises}/>
        </Grid>
      </Grid>

    </Grid>
  );
}

export default App;
