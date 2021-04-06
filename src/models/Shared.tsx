import {AttributeTypes} from "../constants/Attributes"
import {ExpertiseTypes} from "../constants/Expertises"
import {attributesBaseValues, attributesHighestValues, attributesNames, attributesPlayerHighestValues} from "../constants/BaseValues"
import { WeaponType } from "./WeaponModel"
export interface AttributeTemplate{
  name: string,
  total: number,
  playerTotal: number,
  current: number,
  base: number,
  isFavourite: boolean,

  normalSuccess: number | undefined,
  goodSuccess: number | undefined,
  excellentSuccess: number | undefined,

  type: AttributeTypes | ExpertiseTypes
}

export function createAttribute( 
  type: AttributeTypes | ExpertiseTypes,
  isFavourite?: boolean,
  current?: number
  ) : AttributeTemplate{

  const attributeValue = current ? current : getBaseValue(type)

  if(type === ExpertiseTypes.OTHER_SIDE_EXPOSURE){
    return {
      name: getName(type),
      total: attributesHighestValues[type],
      playerTotal: attributesPlayerHighestValues[type],
      current: attributeValue,
      base: getBaseValue(type),
      normalSuccess: attributeValue,
      goodSuccess: attributeValue / 2,
      excellentSuccess: attributeValue / 5,
      isFavourite: isFavourite ? isFavourite : false,
      type: type,
    }  
  }

  return {
    name: getName(type),
    total: attributesHighestValues[type],
    playerTotal: attributesPlayerHighestValues[type],
    current: attributeValue,
    base: getBaseValue(type),
    normalSuccess: 21 - attributeValue,
    goodSuccess: Math.ceil(21 - attributeValue/2) <= 20 ? Math.ceil(21 - attributeValue/2) : undefined,
    excellentSuccess: Math.ceil(21 - attributeValue/5) <= 20 ? Math.ceil(21 - attributeValue/5) : undefined,
    isFavourite: isFavourite ? isFavourite : false,
    type: type,
  }
}


export function getAttributeByType(attribute : AttributeTypes | ExpertiseTypes, attributes: Array<AttributeTemplate>) : AttributeTemplate {
  const attributeFound = attributes.filter((attr)=>{
    return attr.type === attribute
  })[0]

  if(attributeFound === undefined){
    return createAttribute(attribute)
  }

  return attributeFound
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

export function getFavourite(attribute : AttributeTypes | ExpertiseTypes, attributes: Array<AttributeTemplate>) : boolean{
  const attributeFound = attributes.filter((a)=>{
    return attribute === a.type
  })[0]

  if (attributeFound === undefined){
    return false
  }

  return attributeFound.isFavourite
}

export function changeAttribute(attribute : AttributeTypes | ExpertiseTypes, attributes: Array<AttributeTemplate>, newValue: number) : Array<AttributeTemplate> {
  
  const attributeFound = attributes.filter((a)=>{
    return attribute === a.type
  })[0]

  if (attributeFound === undefined){
    return [...attributes, createAttribute(attribute, undefined, (newValue-0) )]
  }

  return attributes.map((a) => {
    
    if(a.type === attribute){
      return createAttribute(attribute, a.isFavourite, (newValue - 0))
    }
    return a
  })
}

export function toggleFavourite(attribute : AttributeTypes | ExpertiseTypes, attributes: Array<AttributeTemplate>) : Array<AttributeTemplate> {
  const attributeFound = attributes.filter((a)=>{
    return attribute === a.type
  })[0]

  if (attributeFound === undefined){
    return [...attributes, createAttribute(attribute, true)]
  }

  return attributes.map((a) => {
    if(a.type === attribute){
      return {...a, isFavourite: !a.isFavourite}
    }
    return a
  })
}


export function getBaseValue(type : AttributeTypes | ExpertiseTypes){
  return attributesBaseValues[type]
}

export function getName(type : AttributeTypes | ExpertiseTypes | WeaponType) : string{
  return attributesNames[type]
}