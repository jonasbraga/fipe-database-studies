//@ts-ignore
import * as fipe from 'fipe-promise'
import { FipeMakes, FipeModels, FipeYears } from '../types'
import { writeFileSync } from 'fs'

export const getBrands = async () => {
  fipe
    .fetchBrands(fipe.vehicleType.CARS)
    .then((brands: FipeMakes) => {
      console.log(brands)
    })
    .catch((error: any) => {
      console.log(error)
    })
}

export const getModels = async (brandId: number) => {
  fipe
    .fetchModels(fipe.vehicleType.CARS, brandId)
    .then((models: FipeModels) => {
      writeFileSync('models.json', JSON.stringify(models))
    })
    .catch((error: any) => {
      console.log(error)
    })
}

export const getYears = async (brandId: number, modelId: number) => {
  fipe
    .fetchYears(fipe.vehicleType.CARS, brandId, modelId)
    .then((years: FipeYears) => {})
    .catch((error: any) => {
      console.log(error)
    })
}

export const getDetails = async (
  brandId: number,
  modelId: number,
  yearId: string
) => {
  fipe
    .fetchDetail(fipe.vehicleType.CARS, brandId, modelId, yearId)
    .then((details: any) => {})
    .catch((error: any) => {
      console.log(error)
    })
}
