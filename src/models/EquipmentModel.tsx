
export interface EquipmentModel{
  id: string, 
  name: string,
  description: string,
  weight: number
}


export function createEquipment(name : string, id?: string, description?: string, weight?: number) : EquipmentModel{
  return {
    id: id ? id : '_' + Math.random().toString(36).substr(2, 9),
    name : name,
    description: description ? description : "",
    weight: weight ? weight : 0 
  } 
}