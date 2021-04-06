export interface Status{
  heavyWound : boolean,
  unconscious: boolean,
  dying: boolean,
  traumatized: boolean,
  crazy: boolean
}

export function createStatus(heavyWound?: boolean, unconscious?: boolean, dying?: boolean, traumatized?: boolean, crazy?: boolean) : Status{
  return {
    heavyWound: heavyWound ? heavyWound : false,
    unconscious: unconscious ? unconscious : false,
    dying: dying? dying: false,
    traumatized: traumatized  ? traumatized : false,
    crazy: crazy ? crazy : false
  }
}