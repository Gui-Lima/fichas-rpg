import {AttributeTypes} from "../constants/Attributes"
import {ExpertiseTypes} from "../constants/Expertises"
import {attributesBaseValues} from "../constants/BaseValues"

export interface AttributeTemplate{
  name: string,
  total: number,
  playerTotal: number,
  current: number,
  base: number,

  normalSuccess: number | undefined,
  goodSuccess: number | undefined,
  excellentSuccess: number | undefined,

  type: AttributeTypes | ExpertiseTypes
}

export function createAttribute(
  name: string, 
  total: number, 
  playerTotal: number, 
  current: number, 
  type: AttributeTypes | ExpertiseTypes ) : AttributeTemplate{
  return {
    name: name,
    total: total,
    playerTotal: playerTotal,
    current: current,
    base: getBaseValue(type),
    normalSuccess: 21 - playerTotal,
    goodSuccess: Math.ceil(21 - playerTotal/2) <= 20 ? Math.ceil(21 - playerTotal/2) : undefined,
    excellentSuccess: Math.ceil(21 - playerTotal/5) <= 20 ? Math.ceil(21 - playerTotal/4) : undefined,

    type: type,
  }
}


export function getAttribute(attribute : AttributeTypes | ExpertiseTypes, attributes: Array<AttributeTemplate>) : number{
  const attributeFound = attributes.filter((a)=>{
    return attribute === a.type
  })[0]

  if (attributeFound === undefined){
    return getBaseValue(attribute)
  }

  return attributeFound.current
}


export function getBaseValue(type : AttributeTypes | ExpertiseTypes){
  return attributesBaseValues[type]
}