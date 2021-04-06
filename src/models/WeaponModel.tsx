import { Damage } from "./Damage";

export enum WeaponType{
  SMALL_GUNFIRE = "SMALL_GUNFIRE",
  MEDIUM_GUNFIRE = "MEDIUM_GUNFIRE",
  HEAVY_GUNFIRE = "HEAVY_GUNFIRE",
  MECHANICAL_RANGED_WEAPON = "MECHANICAL_RANGED_WEAPON",
  FIGHT_BRAWL = "FIGHT_BRAWL",
  FIGHT_WEAPONS = "FIGHT_WEAPONS",
}

export interface WeaponModel{
  name: string,
  type: WeaponType,
  damage: Damage,
  currentAmmunition: number,
  totalAmmunication: number,
  turnsToAttack: number,
  range: number,
  disaster: number,
  areaOfEffect?: number
}


export function createWeapon(
  name: string, 
  type: WeaponType, 
  totalAmmunition: number, 
  range: number, 
  turnsToAttack?: number,
  currentAmmunition?: number,
  damage?: Damage,
  disaster?: number,
  areaOfEffect?: number ) : WeaponModel{

  return {
    name: name,
    type: type,
    totalAmmunication: totalAmmunition,
    range: range,
    currentAmmunition: currentAmmunition ? currentAmmunition : totalAmmunition,
    damage: damage ? damage : {damage: "1d3"},
    disaster: disaster ? disaster : 1,
    areaOfEffect: areaOfEffect ? areaOfEffect : 0,
    turnsToAttack: turnsToAttack ? turnsToAttack : 1
  }

}