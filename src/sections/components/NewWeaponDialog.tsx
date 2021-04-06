import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControl,
  MenuItem,
  InputLabel,
  Button,
  Grid,
  TextField,
  Select,
  Typography,
} from "@material-ui/core";
import { WeaponModel, WeaponType } from "../../models/WeaponModel";
import { getName } from "../../models/Shared";
import useStyles from "./NewWeaponDialogStyles";

const baseWeapon = {
  name: "",
  type: WeaponType.SMALL_GUNFIRE,
  damage: {damage: "1d3"},
  totalAmmunication: 0,
  turnsToAttack: 1,
  range: 0,
  disaster: 1,
  areaOfEffect: 0,
}

function NewWeaponDialog(props: Props) {
  const classes = useStyles();

  const [weapon, setWeapon] = useState(baseWeapon);

  function clearFields(){
    setWeapon(baseWeapon)
  }

  return (
    <Dialog
      open={props.open}
      onClose={() => {props.handleClose(); clearFields()}}
      aria-labelledby="form-dialog-title"
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogTitle disableTypography>
        <Typography style={{ color: "#FFF", fontSize: 24, fontWeight: 700 }}>
          New Weapon
        </Typography>
      </DialogTitle>
      <DialogContent classes={{ root: classes.contentRoot }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              margin="dense"
              label="Nome"
              fullWidth
              InputLabelProps={{ style: { color: "#FFF" } }}
              inputProps={{ style: { color: "#FFF" } }}
              value={weapon.name}
              onChange={(e) => {
                setWeapon({ ...weapon, name: e.target.value });
              }}
            />
          </Grid>

          <Grid item>
            <FormControl fullWidth variant="outlined">
              <InputLabel style={{ color: "#FFF" }}>Type</InputLabel>
              <Select
                value={weapon.type}
                onChange={(e) => {
                  setWeapon({ ...weapon, type: e.target.value });
                }}
                inputProps={{ style: { color: "#FFF" } }}
                classes={{ root: classes.selectRoot }}
              >
                {Object.entries(WeaponType).map((weaponType) => {
                  return (
                    <MenuItem key={`listWeaponTypes-${weaponType[0]}-${weaponType[1]}`} value={weaponType[0]}>
                      {getName(weaponType[1])}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid container direction="row" item spacing={3}>
            <Grid item xs>
              <TextField
                margin="dense"
                label="Dano"
                InputLabelProps={{ style: { color: "#FFF" } }}
                inputProps={{ style: { color: "#FFF" } }}
                value={weapon.damage.damage}
                onChange={(e) => {
                  setWeapon({ ...weapon, damage: {damage :e.target.value} });
                }}
              />
            </Grid>

            <Grid item xs>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Ataques"
                fullWidth
                InputLabelProps={{ style: { color: "#FFF" } }}
                inputProps={{ style: { color: "#FFF" } }}
                value={weapon.turnsToAttack}
                onChange={(e) => {
                  setWeapon({ ...weapon, turnsToAttack: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs>
              <TextField
                autoFocus
                margin="dense"
                label="Alcance"
                fullWidth
                InputLabelProps={{ style: { color: "#FFF" } }}
                inputProps={{ style: { color: "#FFF" } }}
                value={weapon.range}
                onChange={(e) => {
                  setWeapon({ ...weapon, range: e.target.value });
                }}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" item spacing={2}>
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Munição Máxima"
                InputLabelProps={{ style: { color: "#FFF" } }}
                inputProps={{ style: { color: "#FFF" } }}
                value={weapon.totalAmmunication}
                onChange={(e) => {
                  setWeapon({ ...weapon, totalAmmunication: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Defeito"
                fullWidth
                InputLabelProps={{ style: { color: "#FFF" } }}
                inputProps={{ style: { color: "#FFF" } }}
                value={weapon.disaster}
                onChange={(e) => {
                  setWeapon({ ...weapon, disaster: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="AoE"
                fullWidth
                InputLabelProps={{ style: { color: "#FFF" } }}
                inputProps={{ style: { color: "#FFF" } }}
                value={weapon.areaOfEffect}
                onChange={(e) => {
                  setWeapon({ ...weapon, areaOfEffect: e.target.value });
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{paddingTop: 30}}>
        <Button
          variant="contained"
          onClick={() => {clearFields(); props.handleClose()}}
          classes={{ root: classes.buttonRoot }}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            clearFields()
            props.handleSend(weapon);
          }}
          classes={{ root: classes.buttonRoot }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface Props {
  open: boolean;
  handleSend: (newWeapon: WeaponModel) => void;
  handleClose: () => void;
}

export default NewWeaponDialog;
