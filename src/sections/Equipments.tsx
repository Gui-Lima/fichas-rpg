import React from "react";
import {
  Grid,
  Typography,
  Divider,
  IconButton,
  TextField,
} from "@material-ui/core";
import useStyles from "./EquipmentStyles";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import { createEquipment, EquipmentModel } from "../models/EquipmentModel";
import { addNewEquipment, CharacterModel, deleteEquipment, modifyEquipment } from "../models/CharacterModel";
import DeleteIcon from "@material-ui/icons/Delete";

function Equipments(props: Props) {
  const classes = useStyles();

  const totalWeight: number = props.equipments
    .map((equipment) => equipment.weight)
    .reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue));

  const equipmentItem = (equipment: EquipmentModel) => (
    <Grid container direction="row" alignItems="center" justify="center" spacing={2}>
      <Grid item xs={2}>
        <IconButton onClick={()=>{props.modifyCharacter(deleteEquipment(props.character, equipment))}} classes={{root: classes.iconButtonRoot}}>
          <DeleteIcon style={{color: "#FFF"}}/>
        </IconButton>
      </Grid>
      <Grid item xs={6}>
      <TextField
          value={equipment.name}
          onChange={(e)=>{props.modifyCharacter(modifyEquipment(props.character, createEquipment(e.target.value, equipment.id, equipment.description, equipment.weight) ))}}
          inputProps={{
            style: {
              color: "#FFF",
              fontSize: 16,
              fontWeight: 700,
              minHeight: 25,
              paddingBottom: 0,
              textAlign: "center",
            },
          }}
        />
      </Grid>
      <Grid item xs={2}>
      <TextField
          value={equipment.weight}
          onChange={(e)=>{props.modifyCharacter(modifyEquipment(props.character, createEquipment(equipment.name, equipment.id, equipment.description, e.target.value) ))}}
          inputProps={{
            style: {
              color: "#FFF",
              fontSize: 16,
              minHeight: 25,
              fontWeight: 700,
              paddingBottom: 0,
              textAlign: "center",
            },
          }}
        />
      </Grid>
    </Grid>
  );

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.container}
    >
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          item
          spacing={2}
        >
          <Grid item>
            {" "}
            <Typography
              style={{ fontSize: 24, fontWeight: 700, color: "#FFF" }}
            >
              {" "}
              EQUIPAMENTOS{" "}
            </Typography>
          </Grid>
          <Grid item>
            <ControlPointIcon
              onClick={() => {props.modifyCharacter(addNewEquipment(props.character, createEquipment("New equipment")))}}
              style={{ color: "#FFF", cursor: "pointer" }}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Typography style={{ fontSize: 16, fontWeight: 500, color: "#FFF" }}>
            {`Peso Total: ${totalWeight}`}
          </Typography>
        </Grid>
      </Grid>

      <Grid item style={{ width: "100%", paddingBottom: 12 }}>
        <Divider style={{ width: "100%", backgroundColor: "#FFF" }} />
      </Grid>

      <Grid
        container
        direction="row"
        item
        spacing={3}
        style={{ paddingTop: 8 }}
      >
        {props.equipments.map((equipment, i) => {
          return <Grid key={`${equipment.id}-${i}`} item xs={6}>
            {equipmentItem(equipment)}
          </Grid>;
        })}
      </Grid>
    </Grid>
  );
}

interface Props {
  equipments: Array<EquipmentModel>,
  character: CharacterModel,
  modifyCharacter: (newCharacter) => void;
}

export default Equipments;
