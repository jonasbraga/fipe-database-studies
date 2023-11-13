import axios from 'axios'
import {
  NhtsaMakes,
  NhtsaModels,
  NhtsaSafetyRatings,
  NhtsaVehicleYears,
  NhtsaYears,
} from '../types'

const cache = new Map<string, any>()

export const getNhtsaSafetyRatings = async (VehicleId: number) => {
  const cacheKey = `getNhtsaSafetyRatings:${VehicleId}`

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as NhtsaSafetyRatings['Results'][0] | null
  }

  const response = await axios.get(
    `https://api.nhtsa.gov/SafetyRatings/VehicleId/${VehicleId}`
  )

  const data = response.data as NhtsaSafetyRatings

  if (data.Count === 0) {
    cache.set(cacheKey, null)
    return null
  }

  const result = data.Results[0]
  cache.set(cacheKey, result)

  return result
}

export const getNhstaYears = async () => {
  const cacheKey = `getNhstaYears`

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as NhtsaYears['Results'] | null
  }

  const response = await axios.get(`https://api.nhtsa.gov/SafetyRatings`)

  const data = response.data as NhtsaYears

  if (data.Count === 0) {
    cache.set(cacheKey, null)
    return null
  }

  const results = data.Results
  cache.set(cacheKey, results)

  return results
}

export const getNhstaMakesByYear = async (year: number) => {
  const cacheKey = `getNhstaMakesByYear:${year}`

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as NhtsaMakes['Results'] | null
  }

  const response = await axios.get(
    `https://api.nhtsa.gov/SafetyRatings/modelyear/${year}`
  )

  const data = response.data as NhtsaMakes

  if (data.Count === 0) {
    cache.set(cacheKey, null)
    return null
  }

  const results = data.Results
  cache.set(cacheKey, results)

  return results
}

export const getNhstaModelsByMake = async (year: number, make: string) => {
  const cacheKey = `getNhstaModelsByMake:${year}:${make}`

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as NhtsaModels['Results'] | null
  }

  const response = await axios.get(
    `https://api.nhtsa.gov/SafetyRatings/modelyear/${year}/make/${make}`
  )

  const data = response.data as NhtsaModels

  if (data.Count === 0) {
    cache.set(cacheKey, null)
    return null
  }

  const results = data.Results
  cache.set(cacheKey, results)

  return results
}

export const getNhstaVehicleIdsByModel = async (
  year: number,
  make: string,
  model: string
) => {
  const cacheKey = `getNhstaVehicleIdsByModel:${year}:${make}:${model}`

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) as NhtsaVehicleYears['Results'] | null
  }

  const response = await axios.get(
    `https://api.nhtsa.gov/SafetyRatings/modelyear/${year}/make/${make}/model/${model}`
  )

  const data = response.data as NhtsaVehicleYears

  if (data.Count === 0) {
    cache.set(cacheKey, null)
    return null
  }

  const results = data.Results
  cache.set(cacheKey, results)

  return results
}
