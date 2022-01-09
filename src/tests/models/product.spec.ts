import store, { Product } from '../../models/Product'

let product: Product

describe('Product Model', () => {
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

  it('create method should add a product', async () => {
    const result = await store.create({
      name: 'opal necklace',
      price: 1450,
      category: 'jewelry',
      image_url: 'thumbnail image'
    })
    product = result
    expect(result).toEqual({
      id: product.id,
      name: 'opal necklace',
      price: 1450,
      category: 'jewelry',
      image_url: 'thumbnail image'
    })
    product = result
  })

  it('index method should return a list of products', async () => {
    const result = await store.index()
    expect(result).toEqual([
      {
        id: product.id,
        name: 'opal necklace',
        price: 1450,
        category: 'jewelry',
        image_url: 'thumbnail image'
      }
    ])
  })

  it('show method should return the correct product', async () => {
    const result = await store.show(product.id as string)
    expect(result).toEqual({
      id: product.id,
      name: 'opal necklace',
      price: 1450,
      category: 'jewelry',
      image_url: 'thumbnail image'
    })
  })

  it('delete method should remove the product', async () => {
    await store.delete(product.id as string)
    const result = await store.index()

    expect(result).toEqual([])
  })
})
