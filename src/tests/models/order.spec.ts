import store, { Order } from '../../models/Order'
import userStore, { User } from '../../models/User'

let order: Order
let user: User

describe('Order Model', () => {
  describe('should have CRUD methods', () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined()
    })

    it('should have a show method', () => {
      expect(store.show).toBeDefined()
    })

    it('should have a create method', () => {
      expect(store.create).toBeDefined()
    })

    it('should have an update method', () => {
      expect(store.update).toBeDefined()
    })

    it('should have a delete method', () => {
      expect(store.delete).toBeDefined()
    })
  })

  beforeAll(async () => {
    const result: User = await userStore.create({
      first_name: 'test',
      last_name: 'user',
      username: 'TestUser',
      password: 'blahblahblah'
    })
    user = result
  })

  afterAll(async () => {
    await userStore.delete(user.id as string)
  })

  it('create method should add a order', async () => {
    const result = await store.create({
      user_id: user.id as string,
      status: 'active'
    })
    order = result
    expect(result).toEqual({
      id: order.id,
      user_id: user.id as string,
      status: 'active'
    })
  })

  it('index method should return a list of orders', async () => {
    const result = await store.index()
    expect(result[0]).toEqual({
      id: order.id,
      user_id: user.id as string,
      status: 'active'
    })
  })

  it('show method should return the correct order', async () => {
    const result = await store.show(order.id as string)
    expect(result).toEqual({
      id: order.id,
      user_id: user.id as string,
      status: 'active'
    })
  })

  it('delete method should remove the order', async () => {
    await store.delete(order.id as string)
    const result = await store.index()

    expect(result).toEqual([])
  })
})
