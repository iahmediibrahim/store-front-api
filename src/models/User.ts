import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import client from '../database'

dotenv.config()
const pepper = process.env.BCYPT_PASSWORD as string
const saltrounds = process.env.SALT_ROUNDS as string

export type User = {
  id?: string
  username: string
  first_name: string
  last_name: string
  password?: string
  password_digest?: string
}

export class UserStore {
  // define table name
  table: string = 'users'

  async index(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM ${this.table}`
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Could not find users. ${error}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM ${this.table} WHERE id=($1)`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not find user with id= ${id}. ${error}`)
    }
  }

  async create(user: User): Promise<User> {
    const hashedPassword = bcrypt.hashSync(
      user.password + pepper,
      parseInt(saltrounds, 10)
    )
    try {
      const conn = await client.connect()
      const sql = `INSERT INTO ${this.table} (first_name, last_name, username, password_digest) VALUES ($1, $2, $3, $4) RETURNING *`
      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        user.username,
        hashedPassword
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not create new user ${user.id}. ${error}`)
    }
  }

  async update(id: string, user: User): Promise<User> {
    const hashedPassword = bcrypt.hashSync(
      user.password + pepper,
      parseInt(saltrounds, 10)
    )
    try {
      const conn = await client.connect()
      const sql = `UPDATE ${this.table} SET first_name=($1), last_name=($2), username=($3), password_digest=($4) WHERE id=($5) RETURNING *`
      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        user.username,
        hashedPassword,
        id
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not update user with id= ${id}. ${error}`)
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const conn = await client.connect()
      const sql = `DELETE FROM ${this.table} WHERE id=($1)`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not delete user with id= ${id}. ${error}`)
    }
  }

  async authintcateUser(
    username: string,
    password: string
  ): Promise<User | any> {
    try {
      const conn = await client.connect()
      const sql = `SELECT password_digest FROM ${this.table} WHERE username=($1)`
      const result = await conn.query(sql, [username])
      conn.release()
      if (result.rows.length) {
        const user = result.rows[0]

        if (bcrypt.compareSync(password + pepper, user.password_digest))
          return user
      }
      return null
    } catch (error) {
      throw new Error(`Failed authenticating user= ${username}. ${error}`)
    }
  }
}

export default new UserStore()
