import {
  FipeDetails,
  FipeMakes,
  FipeModels,
  FipeYears,
  NhtsaSafetyRatings,
} from '../types'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const saveMakes = async (make: FipeMakes[0]) => {
  try {
    const query = {
      text: 'INSERT INTO marca (codigo, nome_marca) VALUES ($1, $2) RETURNING id',
      values: [make.codigo, make.nome],
    }
    console.log(query)
    const result = await pool.query(query)
    return result.rows[0].id
  } catch (error) {
    console.error(error)
    return 1
  }
}

export const saveModels = async (model: FipeModels[0], idMake: number) => {
  const query = {
    text: 'INSERT INTO modelo (codigo_modelo_fipe, nome_modelo, id_marca) VALUES ($1, $2, $3) RETURNING id',
    values: [model.codigo, model.nome, idMake],
  }
  console.log(query)
  const result = await pool.query(query)
  return result.rows[0].id
}

export const saveYears = async (year: FipeYears[0]) => {
  const query = {
    text: 'INSERT INTO ano (codigo, nome, ano) VALUES ($1, $2, $3) RETURNING id',
    values: [
      year.codigo,
      year.nome,
      parseInt(year.codigo?.split('-')[0] || '0') || null,
    ],
  }
  console.log(query)
  const result = await pool.query(query)
  return result.rows[0].id
}

export const saveDetails = async (
  details: FipeDetails,
  idModel: number,
  idYear: number
) => {
  const query = {
    text: 'INSERT INTO detalhes_veiculo (tipo_veiculo, valor, marca, modelo, ano_modelo, combustivel, codigo_fipe, mes_referencia, sigla_combustivel, id_modelo, id_ano) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id',
    values: [
      details.TipoVeiculo,
      parseFloat(
        details.Valor?.replace('R$ ', '')
          ?.replace('.', '')
          ?.replace(',', '.') || '0'
      ) || null,
      details.Marca,
      details.Modelo,
      details.AnoModelo,
      details.Combustivel,
      details.CodigoFipe,
      details.MesReferencia,
      details.SiglaCombustivel?.charAt(0) || null,
      idModel,
      idYear,
    ],
  }
  console.log(query)
  const result = await pool.query(query).catch((error) => {
    console.error(error, details)
    return { rows: [{ id: 9999999 }] }
  })

  return result.rows[0].id
}

export const saveSafetyRating = async (
  safetyRating: NhtsaSafetyRatings['Results'][0],
  idVehicleDetails: number
) => {
  const query = {
    text: 'INSERT INTO avaliacao_seguranca (imagem_veiculo, avaliacao_geral, avaliacao_capotagem, chance_capotagem, overall_front_crash_rating, front_crash_driverside_rating, front_crash_passengerside_rating, overall_side_crash_rating, side_crash_driverside_rating, side_crash_passengerside_rating, combined_side_barrier_and_pole_rating_front, combined_side_barrier_and_pole_rating_rear, side_barrier_rating_overall, rollover_rating2, rollover_possibility2, dynamic_tip_result, side_pole_crash_rating, nhtsa_electronic_stability_control, nhtsa_forward_collision_warning, nhtsa_lane_departure_warning, complaints_count, recalls_count, investigation_count, model_year, make, model, vehicle_description, vehicle_id, id_veiculo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29) RETURNING id',
    values: [
      safetyRating.VehiclePicture,
      safetyRating.OverallRating,
      safetyRating.RolloverRating,
      safetyRating.RolloverPossibility,
      safetyRating.OverallFrontCrashRating,
      safetyRating.FrontCrashDriversideRating,
      safetyRating.FrontCrashPassengersideRating,
      safetyRating.OverallSideCrashRating,
      safetyRating.SideCrashDriversideRating,
      safetyRating.SideCrashPassengersideRating,
      safetyRating['combinedSideBarrierAndPoleRating-Front'],
      safetyRating['combinedSideBarrierAndPoleRating-Rear'],
      safetyRating['sideBarrierRating-Overall'],
      safetyRating.RolloverRating2,
      safetyRating.RolloverPossibility2,
      safetyRating.dynamicTipResult,
      safetyRating.SidePoleCrashRating,
      safetyRating.NHTSAElectronicStabilityControl,
      safetyRating.NHTSAForwardCollisionWarning,
      safetyRating.NHTSALaneDepartureWarning,
      safetyRating.ComplaintsCount,
      safetyRating.RecallsCount,
      safetyRating.InvestigationCount,
      safetyRating.ModelYear,
      safetyRating.Make,
      safetyRating.Model,
      safetyRating.VehicleDescription,
      safetyRating.VehicleId,
      idVehicleDetails,
    ],
  }
  console.log(query)
  const result = await pool.query(query).catch((error) => {
    console.error(error, safetyRating)
    return { rows: [{ id: 9999999 }] }
  })
  return result.rows[0].id
}
