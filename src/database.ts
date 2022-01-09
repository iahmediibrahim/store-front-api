import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const { DB_HOST, DB_DEV, DB_USER, DB_PASSWORD, DB_TEST, ENV } = process.env
const database = ENV === 'test' ? DB_TEST : DB_DEV
const client = new Pool({
  host: DB_HOST,
  database,
  user: DB_USER,
  password: DB_PASSWORD
})

export default client
// db-migrate create mythical-worlds-table --sql-file
