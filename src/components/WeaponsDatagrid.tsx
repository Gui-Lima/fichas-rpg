import React from "react";
import {
  Table,
  TextField,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableFooter,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";
import useStyles from "./WeaponsDatagridStyles";
import { WeaponModel } from "../models/WeaponModel";
import { AttributeTemplate, getAttributeByType, getName } from "../models/Shared";
import DeleteIcon from "@material-ui/icons/Delete";
import { ReactComponent as SmallDiceIcon } from "../resources/svg/role-playing_red.svg";
import { ExpertiseTypes } from "../constants/Expertises";
import { CharacterModel } from "../models/CharacterModel";

function WeaponsDatagrid(props: Props) {
  const classes = useStyles();

  const columns: Array<string> = [
    "",
    "Nome",
    "Tipo",
    "Dano",
    "Mun. atual",
    "Mun. máxima",
    "Ataques",
    "Defeito",
    "AoE",
    "",
  ];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead classes={{ root: classes.tableHeadRoot }}>
          <TableRow>
            {columns.map((column, i) => (
              <TableCell
                key={`column-${column}-${i}`}
                classes={{ head: classes.tableHeadCells }}
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows?.map((row) => (
            <TableRow key={row.name}>
              <TableCell
                style={{ maxWidth: 20 }}
                align="left"
                classes={{ root: classes.tableBodyCells }}
              >
                <IconButton classes={{ root: classes.iconButtonRoot }} onClick={()=>{props.rollDice(getAttributeByType(ExpertiseTypes[row.type], props.character.expertises.expertises))}}>
                  <SmallDiceIcon
                    style={{
                      height: 24,
                      width: 24,
                      cursor: "pointer",
                      paddingLeft: 5,
                    }}
                  />
                </IconButton>
              </TableCell>
              <TableCell
                style={{ maxWidth: 250 }}
                align="left"
                classes={{ root: classes.tableBodyCells }}
              >
                {row.name}
              </TableCell>
              <TableCell
                style={{ maxWidth: 160 }}
                align="left"
                classes={{ root: classes.tableBodyCells }}
              >
                {getName(row.type)}
              </TableCell>
              <TableCell
                style={{ maxWidth: 160 }}
                align="left"
                classes={{ root: classes.tableBodyCells }}
              >
                {row.damage.damage}
              </TableCell>
              <TableCell
                style={{ maxWidth: 40 }}
                align="left"
                classes={{ root: classes.tableBodyCells }}
              >
                <TextField
                  fullWidth
                  inputProps={{
                    style: { color: "#FFF", fontSize: 15, fontWeight: 700 },
                  }}
                  value={row.currentAmmunition}
                  onChange={(e) => {
                    props.modifyWeapon({
                      ...row,
                      currentAmmunition: e.target.value,
                    });
                  }}
                />
              </TableCell>
              <TableCell
                style={{ maxWidth: 40 }}
                align="left"
                classes={{ root: classes.tableBodyCells }}
              >
                {row.totalAmmunication}
              </TableCell>
              <TableCell
                style={{ maxWidth: 40 }}
                align="left"
                classes={{ root: classes.tableBodyCells }}
              >
                {row.turnsToAttack}
              </TableCell>
              <TableCell
                style={{ maxWidth: 40 }}
                align="left"
                classes={{ root: classes.tableBodyCells }}
              >
                {row.disaster}
              </TableCell>
              <TableCell
                style={{ maxWidth: 40 }}
                align="left"
                classes={{ root: classes.tableBodyCells }}
              >
                {row.areaOfEffect}
              </TableCell>
              <TableCell
                style={{ maxWidth: 20 }}
                align="left"
                classes={{ root: classes.tableBodyCells }}
              >
                <IconButton classes={{ root: classes.iconButtonRoot }} onClick={()=>{props.deleteWeapon(row.name)}}>
                  <DeleteIcon style={{ color: "#FFF" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow></TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

interface Props {
  rows: Array<WeaponModel>,
  character: CharacterModel,
  modifyWeapon: (newWeapon: WeaponModel) => void,
  deleteWeapon: (weaponName: string) => void,
  rollDice: (type: AttributeTemplate) => void
}

export default WeaponsDatagrid;
