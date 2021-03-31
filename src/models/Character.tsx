import {AttributeModel} from "./Attribute";
import { ExpertiseModel } from "./Expertise";
import { Life } from "./Life";
import { Sanity } from "./Sanity";
import {getAttribute} from "./Shared"
import {AttributeTypes} from "../constants/Attributes"
import {ExpertiseTypes} from "../constants/Expertises"
import { createStatus, Status } from "./Status";

export interface Character{
  name: string,
  player: string,
  occupation: string,
  age: number,
  life: Life,
  sanity: Sanity,
  attributes: AttributeModel,
  expertises: ExpertiseModel
}


export function createCharacter(
  name : string
  , player: string
  , occupation: string
  , age: number
  , attributes : AttributeModel
  , expertises: ExpertiseModel
  , status? : Status
  , currentLife?: number
  , currentSanity?: number){

    const lifeTotal = getAttribute(AttributeTypes.CONSTITUTION, attributes.attributes)/2 + getAttribute(AttributeTypes.SIZE, attributes.attributes)/2 + 2
    const sanityTotal = getAttribute(AttributeTypes.POWER, attributes.attributes) * 5

  return {
    name: name,
    player: player,
    occupation: occupation,
    age: age,

    life: {
      lifeTotal: lifeTotal,
      lifeCurrent: currentLife ? currentLife : lifeTotal,
    },

    sanity: {
      sanityTotal: sanityTotal,
      sanityCurrent: currentSanity ? currentSanity : sanityTotal
    },

    status: status ? status : createStatus(),
    attributes: attributes,
    expertises: expertises
  }
}