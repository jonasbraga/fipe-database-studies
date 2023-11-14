import Fuse from 'fuse.js'
import { FipeDetails } from '../types'
import {
  saveDetails,
  saveMakes,
  saveModels,
  saveSafetyRating,
  saveYears,
} from './db'
import { getDetails, getMakes, getModels, getYears } from './fipe-adapter'
import {
  getNhstaMakesByYear,
  getNhstaModelsByMake,
  getNhstaVehicleIdsByModel,
  getNhstaYears,
  getNhtsaSafetyRatings,
} from './nhtsa-adapter'

export const processFipe = async () => {
  // Should run trought makes API, then for each call the models API, then for each call the years API, then for each call the details API
  // After that, should save the data in the database
  try {
    let allMakes = await getMakes()
    for (const make of allMakes) {
      const makeId = parseInt(make.codigo)
      const allModels = await getModels(makeId)
      const idMake = await saveMakes(make)
      const startTimeMake = new Date()
      for (const model of allModels) {
        model.codigo = parseInt(model.codigo.toString())
        const idModel = await saveModels(model, idMake)
        const modelId = parseInt(model.codigo.toString())
        const allYears = await getYears(makeId, modelId)
        const startTimeModel = new Date()
        for (const year of allYears) {
          const idYear = await saveYears(year)
          const details = await getDetails(makeId, modelId, year.codigo)
          const idVehicleDetails = await saveDetails(details, idModel, idYear)
          const safetyRatingId = await handleSafetyRatings(
            details,
            idVehicleDetails
          )

          const currentTime = new Date()
          const elapsedTime =
            (currentTime.getTime() - startTimeModel.getTime()) / 1000

          if (elapsedTime > 30) {
            console.log(
              'More than 30 seconds have passed. Skipping to next model.'
            )
            break
          }
        }

        const currentTime = new Date()
        const elapsedTime =
          (currentTime.getTime() - startTimeMake.getTime()) / 1000

        if (elapsedTime > 300) {
          console.log('More than 5 minutes have passed. Skipping to next make.')
          break
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
}

const handleSafetyRatings = async (
  details: FipeDetails,
  idVehicleDetails: number
) => {
  const vehicleId = await getVehicleId(details)
  if (vehicleId) {
    // This data is not available for all vehicles
    const safetyRatings = await getNhtsaSafetyRatings(vehicleId)
    if (!safetyRatings) {
      return
    }
    const safetyRatingId = await saveSafetyRating(
      safetyRatings,
      idVehicleDetails
    )
    return safetyRatingId
  }
}

// Should get the car details and call the NHTSA APIs to get the safety ratings (if available), must use fuse.js to find the correct vehicle, and call all the NTSHA APIs in order so we can get the right vehicleId to call the safety ratings API
const getVehicleId = async (fipeVehicleDetails: FipeDetails) => {
  try {
    const years = await getNhstaYears()
    if (!years) {
      throw new Error('No years data found')
    }

    const year = years.find(
      (year) => year.ModelYear === fipeVehicleDetails.AnoModelo
    )
    if (!year) {
      throw new Error(
        `No year data found for year ${fipeVehicleDetails.AnoModelo}`
      )
    }

    const makes = await getNhstaMakesByYear(year.ModelYear)
    if (!makes) {
      throw new Error(`No makes data found for year ${year.ModelYear}`)
    }

    const fuseMakes = new Fuse(makes, { keys: ['Make'] })
    const resultFuseMake = fuseMakes.search(fipeVehicleDetails.Marca)

    const make = resultFuseMake.length > 0 ? resultFuseMake[0] : null
    if (!make) {
      throw new Error(`No make data found for make ${fipeVehicleDetails.Marca}`)
    }

    const models = await getNhstaModelsByMake(year.ModelYear, make.item.Make)
    if (!models) {
      throw new Error(
        `No models data found for make ${make.item.Make} and year ${year.ModelYear}`
      )
    }

    const fuseModels = new Fuse(models, { keys: ['Model'] })
    const resultFuseModel = fuseModels.search(fipeVehicleDetails.Modelo)

    const model = resultFuseModel.length > 0 ? resultFuseModel[0] : null
    if (!model) {
      throw new Error(
        `No model data found for model ${fipeVehicleDetails.Modelo}`
      )
    }

    const vehicleIds = await getNhstaVehicleIdsByModel(
      year.ModelYear,
      make.item.Make,
      model.item.Model
    )
    if (!vehicleIds) {
      throw new Error(
        `No vehicleIds data found for make ${make.item.Make}, model ${model.item.Model}, and year ${year.ModelYear}`
      )
    }

    if (vehicleIds.length === 1) {
      return vehicleIds[0].VehicleId
    }

    const fuseVehicleIds = new Fuse(vehicleIds, {
      keys: ['VehicleDescription'],
    })
    const resultFuseVehicleId = fuseVehicleIds.search(fipeVehicleDetails.Modelo)

    const vehicleId =
      resultFuseVehicleId.length > 0 ? resultFuseVehicleId[0] : null
    if (!vehicleId) {
      throw new Error(
        `No vehicleId data found for model ${fipeVehicleDetails.Modelo}`
      )
    }

    return vehicleId.item.VehicleId
  } catch (error) {
    console.error('Error trying to get Vehicle ID: ', error)
    return null
  }
}
