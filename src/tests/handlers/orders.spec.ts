import supertest from 'supertest'
import app from '../../index'
import { Order } from '../../models/Order'

const request = supertest(app)
let order: Order
let orders: Order[]
let token: String
let result: supertest.Response
const usersEndPoint = `/api/users`
const ordersEndPoint = `/api/orders`

describe('Orders endpoints', () => {
  beforeAll(async () => {
    const user = await request
      .post(`${usersEndPoint}/signup`)
      .send({
        first_name: 'test',
        last_name: 'user',
        username: 'testUser',
        password: 'secret'
      })
      .set('Accept', 'application/json')

    token = user.body.accessToken
    console.log(token)
  })

  describe('POST /orders', () => {
    it('should return status 401 with no token', async () => {
      result = await request
        .post(`${ordersEndPoint}`)
        .send({ status: 'active' })

      expect(result.status).toEqual(401)
    })

    it('responds with status 200 with token', async () => {
      result = await request
        .post(`${ordersEndPoint}`)
        .send({ status: 'active', user_id: '1', token })
        .set('Authorization', `Bearer ${token}`)

      order = result.body
      console.log(order)

      expect(result.status).toEqual(200)
    })

    it('should return new order', () => {
      expect(result.body).toEqual({
        id: order.id as string,
        status: 'active',
        user_id: 1
      })
    })
  })

  describe('GET /orders', () => {
    it('responds with status 200', async () => {
      result = await request
        .get(`${ordersEndPoint}`)
        .set('Authorization', `Bearer ${token}`)

      orders = result.body

      expect(result.status).toEqual(200)
    })

    it('should return orders', () => {
      expect(result.body).toEqual([
        {
          id: order.id,
          status: 'active',
          user_id: 1
        }
      ])
    })
  })

  describe('DELETE /orders/1', () => {
    it('responds with status 200', async () => {
      result = await request
        .delete(`${ordersEndPoint}/1`)
        .send({ token })
        .set('Authorization', `Bearer ${token}`)

      orders = result.body

      expect(result.status).toEqual(200)
    })

    it('should return no orders', async () => {
      result = await request
        .get(`${ordersEndPoint}`)
        .set('Authorization', `Bearer ${token}`)
      expect(result.body).toEqual([])
    })
  })
  afterAll(async () => {
    await request
      .delete(`${usersEndPoint}/1`)
      .send({ token })
      .set('Authorization', `Bearer ${token}`)
  })
})
