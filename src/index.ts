import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import morgan from 'morgan'
import path from 'path'
import errorHandler from './middleware/errorHandler.middleware'
import router from './routes'

dotenv.config()

const PORT = process.env.PORT || 5000
// create an instance server
const app: Application = express()

// HTTP request logger middleware
app.use(morgan('short'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', router)
// Error handler middleware
app.use(errorHandler)
// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app
