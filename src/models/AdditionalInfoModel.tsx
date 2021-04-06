export interface AdditionalInfoModel{
  significantOthers : string,
  notes: string,
}

export function createAdditionalInfo(significantOthers?: string, notes?: string) : AdditionalInfoModel{
  return {significantOthers: significantOthers ? significantOthers : "", notes: notes ? notes : ""}
}