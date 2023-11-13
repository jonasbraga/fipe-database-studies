import makes from '../examples/fipe/makes.json'
import models from '../examples/fipe/models.json'
import years from '../examples/fipe/years.json'
import details from '../examples/fipe/details.json'

import vehicleYears from '../examples/nhtsa/vehicle-years.json'
import safetyRatings from '../examples/nhtsa/safety-ratings.json'
import nhtsaMakes from '../examples/nhtsa/makes.json'
import nhtsaModels from '../examples/nhtsa/models.json'
import nhtsaYears from '../examples/nhtsa/years.json'

export type FipeMakes = typeof makes
export type FipeModels = typeof models
export type FipeYears = typeof years
export type FipeDetails = typeof details

export type NhtsaVehicleYears = typeof vehicleYears
export type NhtsaSafetyRatings = typeof safetyRatings
export type NhtsaMakes = typeof nhtsaMakes
export type NhtsaModels = typeof nhtsaModels
export type NhtsaYears = typeof nhtsaYears
