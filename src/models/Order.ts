import client from '../database'

export type Order = {
  id?: string
  status: string
  user_id: string
}

export type OrderProduct = {
  name?: string
  price: number
  product_id: number
  quantity: number
}

export type OrderItem = {
  product_id: number
  quantity: number
}

export class OrderStore {
  // define table name
  table: string = 'orders'

  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM ${this.table}`
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Could not find orders. ${error}`)
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM ${this.table} WHERE id=($1)`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not find order with id= ${id}. ${error}`)
    }
  }

  async create(order: Order): Promise<Order> {
    let { status } = order

    if (typeof status === 'undefined') {
      status = 'active' // active
    }

    try {
      const conn = await client.connect()
      const sql = `INSERT INTO ${this.table} (user_id, status) VALUES ($1, $2) RETURNING *`
      const result = await conn.query(sql, [order.user_id, status])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not create new order ${order}. ${error}`)
    }
  }

  async update(id: string, order: Order): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql = `UPDATE ${this.table} SET status=($1), user_id=($2) WHERE id=($3) RETURNING *`
      const result = await conn.query(sql, [order.status, order.user_id, id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not update order with id= ${id}. ${error}`)
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql = `DELETE FROM ${this.table} WHERE id=($1)`
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Could not delete order with id= ${id}. ${error}`)
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<OrderProduct> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
      const result = await conn.query(sql, [orderId, productId, quantity])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}. ${error}`
      )
    }
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders WHERE user_id=($1)'
      const result = await conn.query(sql, [userId])
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Could not find orders for user ${userId}. ${error}`)
    }
  }

  async getUserActiveOrders(userId: string): Promise<Order[]> {
    try {
      const conn = await client.connect()
      const sql = "SELECT * FROM orders WHERE status='active' AND user_id=($1)"
      const result = await conn.query(sql, [userId])
      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(
        `Could not find active orders for user ${userId}. ${error}`
      )
    }
  }

  async getUserCompletedOrders(userId: string): Promise<Order[]> {
    try {
      const conn = await client.connect()
      const sql =
        "SELECT * FROM orders WHERE status='completed' AND user_id=($1)"
      const result = await conn.query(sql, [userId])
      conn.release()

      return result.rows
    } catch (error) {
      throw new Error(
        `Could not find completed orders for user ${userId}. ${error}`
      )
    }
  }
}

export default new OrderStore()
