import React from "react";
import { Grid } from "@material-ui/core";
import { Life } from "../models/Life";
import { Sanity } from "../models/Sanity";
import { Status } from "../models/Status";
import Avatar from "../components/Avatar";
import { ReactComponent as D20Icon } from "../resources/svg/role-playing_red.svg";
import AttributeBar from "../components/AttributeBar";
import { CharacterModel } from "../models/CharacterModel";
import AttributeTextfield from "../components/AttributeTextfield";
import {
  AttributeTemplate,
  changeAttribute,
  getAttributeByType,
} from "../models/Shared";
import { AttributeTypes } from "../constants/Attributes";
import { ExpertiseTypes } from "../constants/Expertises";

function Character(props: Props) {
  const statusToCheckboxes = () => {
    return {
      life: [
        {
          displayName: "Lesão grave",
          activated: props.status.heavyWound,
          name: "heavyWound",
        },
        {
          displayName: "Inconsciente",
          activated: props.status.unconscious,
          name: "unconscious",
        },
        {
          displayName: "Morrendo",
          activated: props.status.dying,
          name: "dying",
        },
      ],
      sanity: [
        {
          displayName: "Traumatizado",
          activated: props.status.traumatized,
          name: "traumatized",
        },
        { displayName: "Louco", activated: props.status.crazy, name: "crazy" },
      ],
    };
  };

  const validateNumber = (current, total) => {
    if (current > total) return total;
    return current;
  };

  return (
    <Grid container direction="column">
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        item
      >
        <Grid item>
          <Avatar imageSrc={props.imageSrc} />
        </Grid>

        <Grid item>
          <D20Icon style={{ height: 64, width: 64, cursor: "pointer" }} />
        </Grid>
      </Grid>

      <Grid item style={{ paddingBottom: 16 }}>
        <AttributeBar
          name="Vida"
          character={props.character}
          totalValue={props.life.lifeTotal}
          currentValue={props.life.lifeCurrent}
          color="#C21010"
          changeCurrentValue={(newValue) => {
            props.modifyCharacter({
              ...props.character,
              life: {
                ...props.character.life,
                lifeCurrent: validateNumber(
                  newValue,
                  props.character.life.lifeTotal
                ),
              },
            });
          }}
          checkBoxes={{
            boxes: statusToCheckboxes().life,
            changeBox: (name: string) => {
              props.modifyCharacter({
                ...props.character,
                status: {
                  ...props.character.status,
                  [name]: !props.character.status[name],
                },
              });
            },
          }}
        />
      </Grid>

      <Grid item>
        <AttributeBar
          name="Sanidade"
          character={props.character}
          totalValue={props.sanity.sanityTotal}
          currentValue={props.sanity.sanityCurrent}
          color="#5110C2"
          hasDice
          changeCurrentValue={(newValue) => {
            props.modifyCharacter({
              ...props.character,
              sanity: {
                ...props.character.sanity,
                sanityCurrent: validateNumber(
                  newValue,
                  props.character.sanity.sanityTotal
                ),
              },
            });
          }}
          checkBoxes={{
            boxes: statusToCheckboxes().sanity,
            changeBox: (name: string) => {
              props.modifyCharacter({
                ...props.character,
                status: {
                  ...props.character.status,
                  [name]: !props.character.status[name],
                },
              });
            },
          }}
          rollDice={props.rollDice}

        />
      </Grid>

      <Grid container direction="row" justify="space-evenly">
        <Grid item xs={3}>
          <AttributeTextfield
            attribute={getAttributeByType(
              AttributeTypes.BODY,
              props.character.attributes.attributes
            )}
            changeValue={(newValue: number) => {
              props.modifyCharacter({
                ...props.character,
                attributes: {
                  attributes: changeAttribute(
                    AttributeTypes.BODY,
                    props.character.attributes.attributes,
                    newValue
                  ),
                },
              });
            }}
          />
        </Grid>

        <Grid item xs={3}>
          <AttributeTextfield
            attribute={getAttributeByType(
              ExpertiseTypes.OTHER_SIDE_EXPOSURE,
              props.character.expertises.expertises
            )}
            changeValue={(newValue: number) => {
              props.modifyCharacter({
                ...props.character,
                expertises: {
                  expertises: changeAttribute(
                    ExpertiseTypes.OTHER_SIDE_EXPOSURE,
                    props.character.expertises.expertises,
                    newValue
                  ),
                },
              });
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

interface Props {
  life: Life;
  sanity: Sanity;
  status: Status;
  body: boolean;
  imageSrc: string;
  character: CharacterModel;
  modifyCharacter: (newCharacter) => void;
  rollDice: (type: AttributeTemplate, dice: string) => void;
}

export default Character;
