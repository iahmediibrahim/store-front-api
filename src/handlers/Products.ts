import { NextFunction, Request, Response } from 'express'
import ApiError from '../middleware/ApiError'
import store, { Product } from '../models/Product'

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products: Product[] = await store.index()
    res.status(200).json(products)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await store.show(req.params.id)

    res.status(200).json(product)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newProduct: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    image_url: req.body.image_url
  }

  try {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      res.json('Invalid arguments. name and price and category are Required!')
      return
    }
    const product: Product = await store.create(newProduct)

    res.status(201).json(product)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  // eslint-disable-next-line camelcase
  const { name, price, category, image_url } = req.body
  const product: Product = {
    name,
    price,
    category,
    // eslint-disable-next-line camelcase
    image_url
  }
  try {
    const updatedProduct = await store.update(id, product)
    res.status(201).json(updatedProduct)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const deletedProduct = await store.delete(id)
    res.status(200).json(deletedProduct)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}
export const getProductByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category } = req.params
  console.log('category', category)
  try {
    if (!category) {
      res.json('Invalid arguments. category is Required!')
      return
    }
    const products = await store.categoryIndex(category)
    res.status(200).json(products)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}
export const getOrderProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId: string = req.params.id

  try {
    const orderProducts = await store.getOrderProducts(orderId)
    res.status(200).json(orderProducts)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}
