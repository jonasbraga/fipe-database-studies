//@ts-ignore
import * as fipe from 'fipe-promise'
import { FipeDetails, FipeMakes, FipeModels, FipeYears } from '../types'

export const getMakes = async (): Promise<FipeMakes> => {
  return fipe
    .fetchBrands(fipe.vehicleType.CARS)
    .then((makes: FipeMakes) => makes)
    .catch((error: any) => {
      console.error(error)
    })
}

export const getModels = async (brandId: number): Promise<FipeModels> => {
  return await fipe
    .fetchModels(fipe.vehicleType.CARS, brandId)
    .then((models: FipeModels) => models)
    .catch((error: any) => {
      console.error(error, brandId)
    })
}

export const getYears = async (
  brandId: number,
  modelId: number
): Promise<FipeYears> => {
  return fipe
    .fetchYears(fipe.vehicleType.CARS, brandId, modelId)
    .then((years: FipeYears) => years)
    .catch((error: any) => {
      console.error(error, brandId, modelId)
    })
}

export const getDetails = async (
  brandId: number,
  modelId: number,
  yearId: string
): Promise<FipeDetails> => {
  return fipe
    .fetchDetail(fipe.vehicleType.CARS, brandId, modelId, yearId)
    .then((details: FipeDetails) => details)
    .catch((error: any) => {
      console.error(error, brandId, modelId, yearId)
    })
}
