export interface Status{
  heavyWound : boolean,
  unconscious: boolean,
  dying: boolean
}

export function createStatus(heavyWound?: boolean, unconscious?: boolean, dying?: boolean) : Status{
  return {
    heavyWound: heavyWound ? heavyWound : false,
    unconscious: unconscious ? unconscious : false,
    dying: dying? dying: false
  }
}