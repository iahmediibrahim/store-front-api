import client from '../database'

export type Product = {
  id?: string
  name: string
  price: number
  image_url?: string
  category: string
}
export class ProductStore {
  // define table name
  table: string = 'products'

  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM ${this.table}`
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Could not find products. ${error}`)
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM ${this.table} WHERE id=($1)`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not find product with id= ${id}. ${error}`)
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = `INSERT INTO ${this.table} (name, price, image_url, category) VALUES ($1, $2, $3, $4) RETURNING *`
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.image_url,
        product.category
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not create new product ${product.name}. ${error}`)
    }
  }

  async update(id: string, product: Product): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = `UPDATE ${this.table} SET name=($1), price=($2), image_url=($3), category=($4) WHERE id=($5) RETURNING *`
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.image_url,
        product.category,
        id
      ])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not update product with id= ${id}. ${error}`)
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = `DELETE FROM ${this.table} WHERE id=($1)`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not delete product with id= ${id}. ${error}`)
    }
  }

  async categoryIndex(category: string): Promise<Product[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM ${this.table} WHERE category=($1)`
      const result = await conn.query(sql, [category])
      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(
        `Cannot find products with category name= ${category}. ${error}`
      )
    }
  }

  async getOrderProducts(orderId: string): Promise<Product[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT p.id as product_id, p.name, p.price, op.quantity FROM products p INNER JOIN order_products op on p.id = op.product_id INNER JOIN orders o on op.order_id = o.id WHERE o.id=$1`
      let result = await conn.query(sql, [orderId])

      result = await conn.query(sql, [orderId])
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not find products for order ${orderId}. ${err}`)
    }
  }
}
export default new ProductStore()
