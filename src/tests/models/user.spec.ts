import store, { User } from '../../models/User'

let user: User
describe('User Model', () => {
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
    it('should have a authintcateUser method', () => {
      expect(store.authintcateUser).toBeDefined()
    })
  })

  it('create method should add a user', async () => {
    const createdUser: User = await store.create({
      first_name: 'Ahmed',
      last_name: 'Ibrahim',
      username: 'AhmedIbrahim',
      password: '123456'
    })
    user = createdUser
    console.log(user)

    expect(user).toEqual(
      jasmine.objectContaining({
        id: user.id,
        first_name: 'Ahmed',
        last_name: 'Ibrahim',
        username: 'AhmedIbrahim'
      })
    )
  })

  it('index method should return a list of users', async () => {
    const result = await store.index()
    expect(result).toContain(
      jasmine.objectContaining({
        id: user.id,
        first_name: 'Ahmed',
        last_name: 'Ibrahim',
        username: 'AhmedIbrahim'
      })
    )
  })

  it('show method should return the correct user', async () => {
    const result = await store.show(user.id as string)
    expect(result).toEqual(
      jasmine.objectContaining({
        id: user.id,
        first_name: 'Ahmed',
        last_name: 'Ibrahim',
        username: 'AhmedIbrahim'
      })
    )
  })

  it('delete method should remove the user', async () => {
    await store.delete(user.id as string)
    const result = await store.index()

    expect(result).not.toContain(
      jasmine.objectContaining({
        id: user.id,
        first_name: 'Ahmed',
        last_name: 'Ibrahim',
        username: 'AhmedIbrahim'
      })
    )
  })
})
