import supertest from 'supertest'
import app from '../../index'
import { Product } from '../../models/Product'

const request = supertest(app)
let product: Product
let products: Product[]
let token: String
let result: supertest.Response
const usersEndPoint = `/api/users`
const productsEndPoint = `/api/products`

describe('Product endpoints', () => {
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
      .set('Authorization', `Bearer ${token}`)
    token = user.body.accessToken
  })

  describe('POST /products', () => {
    it('should return status 401 with no token', async () => {
      result = await request
        .post(`${productsEndPoint}`)
        .send({ name: 'Pencils', price: '5', category: 'stationery' })

      expect(result.status).toEqual(401)
    })

    it('responds with status 201 with token', async () => {
      result = await request
        .post(`${productsEndPoint}`)
        .send({
          name: 'Pencils',
          price: '5',
          category: 'stationery',
          image_url: 'thumbnail image',
          token
        })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)

      product = result.body

      expect(result.status).toEqual(201)
    })

    it('should return new product', () => {
      expect(result.body).toEqual({
        id: product.id as string,
        name: 'Pencils',
        price: 5,
        category: 'stationery',
        image_url: 'thumbnail image'
      })
    })
  })

  describe('GET /products', () => {
    it('responds with status 200', async () => {
      result = await request.get(`${productsEndPoint}`)

      products = result.body

      expect(result.status).toEqual(200)
    })

    it('should return products', () => {
      expect(result.body).toEqual([
        {
          id: product.id,
          name: 'Pencils',
          price: 5,
          category: 'stationery',
          image_url: 'thumbnail image'
        }
      ])
    })
  })

  describe('GET /products/1', () => {
    it('responds with status 200', async () => {
      result = await request.get(`${productsEndPoint}/1`)

      product = result.body

      expect(result.status).toEqual(200)
    })

    it('should return product', async () => {
      expect(result.body).toEqual({
        id: product.id,
        name: 'Pencils',
        price: 5,
        category: 'stationery',
        image_url: 'thumbnail image'
      })
    })
  })

  describe('DELETE /products/1', () => {
    it('responds with status 200', async () => {
      result = await request
        .delete(`${productsEndPoint}/1`)
        .send({ token })
        .set('Authorization', `Bearer ${token}`)

      products = result.body

      expect(result.status).toEqual(200)
    })

    it('should return no products', async () => {
      result = await request.get(`${productsEndPoint}`)
      expect(result.body).toEqual([])
    })
  })
  afterAll(async () => {
    result = await request
      .delete(`${usersEndPoint}/1`)
      .send({ token })
      .set('Authorization', `Bearer ${token}`)
  })
})
