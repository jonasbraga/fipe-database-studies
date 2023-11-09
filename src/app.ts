import express, { type Request, type Response } from 'express'
import { getBrands, getDetails, getModels, getYears } from './fipe-adapter'

const app = express()
const port = process.env.PORT || 3000

app.get('/startDownloading', async (req: Request, res: Response) => {
  await getDetails(59, 8112, '2020-1')
})

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World! my pass: ' + process.env.DB_PASSWORD)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
