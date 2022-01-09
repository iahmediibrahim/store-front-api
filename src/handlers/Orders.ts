import { NextFunction, Request, Response } from 'express'
import ApiError from '../middleware/ApiError'
import store, { Order } from '../models/Order'

export const index = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await store.index()
    res.status(200).json(orders)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await store.show(req.params.id)
    res.status(200).json(order)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const order: Order = {
    user_id: req.params.id || req.body.user_id,
    status: req.body.status
  }

  if (order.user_id === '' || typeof order.user_id === 'undefined') {
    res.json('Invalid arguments. Requires id of user making order.')
    return
  }

  try {
    const newOrder = await store.create(order)
    res.status(200).json(newOrder)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const order: Order = {
    user_id: req.params.id || req.body.user_id,
    status: req.body.status
  }

  try {
    const edited = await store.update(req.params.id, order)
    res.json(edited)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await store.delete(req.params.id)
    res.status(200).json(deleted)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId: string = req.params.id
  const { productId } = req.body
  const quantity: number = parseInt(req.body.quantity as string, 10)

  if (!orderId || !productId || quantity === 0) {
    res.json(
      'Invalid arguments. Requires order id, product id and product quantity.'
    )
    return
  }

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId)
    res.status(200).json(addedProduct)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}

export const usersOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.params.id

  try {
    const activeOrder = await store.getUserOrders(userId)
    res.status(200).json(activeOrder)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}

export const userActiveOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.params.id

  try {
    const activeOrders = await store.getUserActiveOrders(userId)
    res.status(200).json(activeOrders)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}

export const userCompletedOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.params.id

  try {
    const completedOrders = await store.getUserCompletedOrders(userId)
    res.status(200).json(completedOrders)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}
