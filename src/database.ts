import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV
} = process.env
const getDatabaseName = (env: string) => {
  switch (env) {
    case 'dev': {
      return POSTGRES_DB
    }
    case 'test': {
      return POSTGRES_TEST_DB
    }
    default:
      return POSTGRES_DB
  }
}
console.log(ENV)

const client = new Pool({
  host: POSTGRES_HOST,
  database: getDatabaseName(ENV as string),
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD
})

export default client
// db-migrate create mythical-worlds-table --sql-file
