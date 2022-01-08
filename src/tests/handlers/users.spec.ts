import supertest from 'supertest'
import app from '../../index'
import { User } from '../../models/User'

const request = supertest(app)
const endpoint = `/api/users`

let user: User
let users: User[]
let token: String
let result: supertest.Response

describe('User endpoints', () => {
  describe('POST api/users/signup', () => {
    it('responds with status 200 with token', async () => {
      result = await request.post(`${endpoint}/signup`).send({
        first_name: 'Ahmed',
        last_name: 'Ibrahim',
        username: 'AhmedIbrahim',
        password: '123456'
      })
      token = result.body.accessToken
      console.log(token)
      expect(result.status).toEqual(201)
    })
  })

  describe('GET api/users', () => {
    it('responds with status 200', async () => {
      result = await request
        .get(`${endpoint}/`)
        .send({ token })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)

      users = result.body
      user = users[users.length - 1]

      expect(result.status).toEqual(200)
    })

    it('should return users', () => {
      expect(result.body).toContain(
        jasmine.objectContaining({
          first_name: 'Ahmed',
          last_name: 'Ibrahim',
          username: 'AhmedIbrahim'
        })
      )
    })
  })

  describe('GET api/users/1', () => {
    it('responds with status 200', async () => {
      result = await request
        .get(`${endpoint}/${user.id}`)
        .send({ token })
        .set('Authorization', `Bearer ${token}`)

      expect(result.status).toEqual(200)
    })

    it('should return user', () => {
      expect(result.body).toEqual(
        jasmine.objectContaining({
          first_name: 'Ahmed',
          last_name: 'Ibrahim',
          username: 'AhmedIbrahim'
        })
      )
    })
  })

  describe('DELETE api/users/1', () => {
    it('responds with status 201', async () => {
      result = await request
        .delete(`${endpoint}/${user.id}`)
        .send({ token })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)

      expect(result.status).toEqual(201)
    })

    it('should return user objects less by one', async () => {
      result = await request
        .get(`${endpoint}/`)
        .send({ token })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)

      expect(result.body.length).toEqual(users.length - 1)
    })
  })
})
