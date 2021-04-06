import {AttributeModel} from "./Attribute";
import { ExpertiseModel } from "./Expertise";
import { Life } from "./Life";
import { Sanity } from "./Sanity";
import {getAttribute} from "./Shared"
import {AttributeTypes} from "../constants/Attributes"
import { createStatus, Status } from "./Status";
import { WeaponModel } from "./WeaponModel";
import { EquipmentModel } from "./EquipmentModel";
import { AdditionalInfoModel } from "./AdditionalInfoModel";

export interface CharacterModel{
  name: string,
  player: string,
  occupation: string,
  age: number,
  gender: string,
  life: Life,
  sanity: Sanity,
  status: Status,
  attributes: AttributeModel,
  expertises: ExpertiseModel,
  weapons: Array<WeaponModel>,
  equipments: Array<EquipmentModel>,
  additionalInfo: AdditionalInfoModel
}


export function createCharacter(
  name : string
  , player: string
  , occupation: string
  , age: number
  , gender: string
  , attributes: AttributeModel
  , expertises?: ExpertiseModel
  , weapons? : Array<WeaponModel>
  , equipments?: Array<EquipmentModel>
  , additionalInfo?: AdditionalInfoModel
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
    gender : gender,
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
    expertises: expertises ? expertises : [],
    weapons: weapons ? weapons : [],
    equipments: equipments ? equipments : [],
    additionalInfo: additionalInfo ? additionalInfo : []
  }
}

export function addNewWeapon(character : CharacterModel ,newWeapon : WeaponModel) : CharacterModel{
  return {...character, weapons: [...character.weapons, newWeapon]}
}

export function modifyWeapon(character: CharacterModel, newWeapon: WeaponModel) : CharacterModel{
  return {...character, weapons: character.weapons.map((weapon)=>{if(weapon.name === newWeapon.name) return newWeapon; return weapon})}
}

export function deleteWeapon(character: CharacterModel, weaponName: string) : CharacterModel{
  return {...character, weapons: character.weapons.filter((weapon)=>{return weapon.name !== weaponName})}
}

export function addNewEquipment(character : CharacterModel, newEquipment: EquipmentModel) : CharacterModel{
  return {...character, equipments: [...character.equipments, newEquipment]}
}

export function modifyEquipment(character : CharacterModel, newEquipment: EquipmentModel) : CharacterModel{
  return {...character, equipments: character.equipments.map((equipment)=>{if(equipment.id === newEquipment.id) return newEquipment; return equipment})}
}

export function deleteEquipment(character : CharacterModel, newEquipment: EquipmentModel) : CharacterModel{
  return {...character, equipments: character.equipments.filter((equipment)=>{return equipment.id !== newEquipment.id})}
}