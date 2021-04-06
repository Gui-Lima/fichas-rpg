import React, {useState, useEffect} from 'react';
import './App.css';
import {Button, Grid, Typography} from "@material-ui/core"
import PersonalDetails from './sections/PersonalDetails';
import Character from "./sections/Character"
import Attributes from './sections/Attributes';
import ExpertiseShortcut from './sections/ExpertiseShortcut';
import { createCharacter } from './models/CharacterModel';
import {  AttributeTemplate, createAttribute } from './models/Shared';
import {AttributeTypes} from "./constants/Attributes"
import {ExpertiseTypes} from "./constants/Expertises"
import {getAttribute} from "./models/Shared"
import useStyles from "./AppStyles"
import Expertises from './sections/Expertises';
import Combat from './sections/Combat';
import { createWeapon, WeaponType } from './models/WeaponModel';
import Equipments from './sections/Equipments';
import { createEquipment } from './models/EquipmentModel';
import AdditionalInfo from './sections/AdditionalInfo';
import { createAdditionalInfo } from './models/AdditionalInfoModel';
import RollDiceDialog from './components/RollDiceDialog';

function App() {
  const classes = useStyles()

  const attributes = 
  { 
    attributes : [
      createAttribute(AttributeTypes.POWER, undefined, 10), 
      createAttribute(AttributeTypes.DEXTERITY, undefined, 12)
  ]}
  
  const weapons = [
    createWeapon("Arco pica", WeaponType.MECHANICAL_RANGED_WEAPON, 1, 15, 2, undefined, {damage:"1d3+1d4"})
  ]

  const equipments = [
    createEquipment("Lanterna")
  ]

  const expertises = 
  { expertises: [
    createAttribute(ExpertiseTypes.ARCHEOLOGY, true, 10), 
    createAttribute(ExpertiseTypes.CHARM, undefined, 12)
  ] }

  const info = createAdditionalInfo("Mom, dad", "ese cara e mt fd")

  const [personagem, setPersonagem] = useState(createCharacter("Anderson", "Filzao", "Uber", 24, "Masc", attributes, expertises, weapons, equipments, info))
  const [rollingDice, setRollingDice] = useState({rolling: false, type: undefined, dice: "d20"})

  useEffect(() => {
    window.onbeforeunload = confirmExit;
    function confirmExit()
    {
      return "show warning";
    }
  }, [])

  function downloadFicha(){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(personagem));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem?.setAttribute("href",     dataStr     );
    dlAnchorElem?.setAttribute("download", "scene.json");
    dlAnchorElem?.click();
  }

  function importFicha(){
    var dlAnchorElem = document.getElementById('importAnchorElem');
    dlAnchorElem?.click();
  }

  function loadCharacter(files : FileList | null){
    if(!files || !files[0]){
      return 
    }
    console.log("alo")

    const file = files[0]
    let json = {}
		var reader = new FileReader();

		reader.onload = (function (file) {
			return function (e) {
				try {
					json = JSON.parse(e.target.result);
          console.log(json)
          setPersonagem(json)
				} catch (ex) {
					alert('ex when trying to parse json = ' + ex);
				}
			}
		})(file);

		reader.readAsText(file);
  }

  
  return (
    <Grid container direction="column" className={classes.container} spacing={4}>
      <a id="downloadAnchorElem" style={{display:"none"}}/>
      <input id="importAnchorElem" accept="*.json" type="file" onChange={ (e) => {loadCharacter(e.target.files)} }  style={{display: "none"}}/>

      <RollDiceDialog open={rollingDice.rolling} dice={rollingDice.dice} handleClose={()=>{setRollingDice({...rollingDice, rolling: false})}} expertise={rollingDice.type}/>

      <Grid container direction="row" justify="flex-end" spacing={3} item>
        <Grid item>
        <Button variant="outlined" color="primary" onClick={downloadFicha} classes={{root: classes.buttonsRoot}}>Baixar Ficha</Button>
        </Grid>

        <Grid item>
        <Button variant="outlined" color="primary" onClick={importFicha} classes={{root: classes.buttonsRoot}}>Importar Ficha</Button>
        </Grid>
        
      </Grid>

      <Grid container direction="row" alignItems="center" justify="center" item>
        <Grid item xs={3}><Typography style={{fontSize: 40, fontWeight:700, color: "#FFF"}}> Personagem </Typography></Grid>
      </Grid>

      <Grid container direction="row" item spacing={4}>
        <Grid item lg={6} xs={12}>
          <PersonalDetails 
            name={personagem.name} 
            player={personagem.player} 
            occupation={personagem.occupation} 
            age={personagem.age}
            gender={personagem.gender}
            character={personagem}
            modifyCharacter={(newCharacter) => {setPersonagem(newCharacter)}}/>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Character 
            life={personagem.life} 
            sanity={personagem.sanity} 
            status={personagem.status} 
            body={getAttribute(AttributeTypes.BODY ,personagem.attributes.attributes) > 0}
            character={personagem}
            modifyCharacter={(newCharacter) => {setPersonagem(newCharacter)}}
            imageSrc={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq_I0JFO2DxoAV3J-sI7ajtx0qW0Q5neaY_A&usqp=CAU"}
            rollDice={(type: AttributeTemplate, dice: string)=>{setRollingDice({rolling: true, type: type, dice: dice})}}/>
        </Grid>
      </Grid>



      <Grid container direction="row" item spacing={2}>
        <Grid item xs={12} lg={6}> 
          <Attributes 
            attributes={personagem.attributes} 
            character={personagem}
            modifyCharacter={(newCharacter) => {setPersonagem(newCharacter)}}
            rollDice={(type: AttributeTemplate)=>{setRollingDice({rolling: true, type: type})}}
            />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ExpertiseShortcut expertises={personagem.expertises}    character={personagem}
            modifyCharacter={(newCharacter) => {setPersonagem(newCharacter)}}
            rollDice={(type: AttributeTemplate)=>{setRollingDice({rolling: true, type: type})}}
            />
        </Grid>
      </Grid>

      <Grid item>
        <Expertises expertises={personagem.expertises} character={personagem}
            modifyCharacter={(newCharacter) => {setPersonagem(newCharacter)}}
            rollDice={(type: AttributeTemplate)=>{setRollingDice({rolling: true, type: type})}}
            />
      </Grid>

      <Grid item>
        <Combat weapons={personagem.weapons} character={personagem}
            modifyCharacter={(newCharacter) => {setPersonagem(newCharacter)}}
            rollDice={(type: AttributeTemplate)=>{setRollingDice({rolling: true, type: type})}}
            />
      </Grid>

      <Grid item>
        <Equipments equipments={personagem.equipments} character={personagem}
            modifyCharacter={(newCharacter) => {setPersonagem(newCharacter)}}
            />
      </Grid>

      <Grid item>
        <AdditionalInfo info={personagem.additionalInfo} character={personagem}  
            modifyCharacter={(newCharacter) => {setPersonagem(newCharacter)}}/>
      </Grid>

    </Grid>
  );
}

export default App;
