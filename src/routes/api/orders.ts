import express from 'express'
import {
  addProduct,
  createOrder,
  deleteOrder,
  index,
  show,
  update
} from '../../handlers/Orders'
import { getOrderProducts } from '../../handlers/Products'
import verifyToken from '../../middleware/verifyToken'
import { Cors, corsWithOptions } from './cors'

const ordersRouter = express.Router()
ordersRouter
  .route('/')
  .options(corsWithOptions, (req, res) => {
    res.sendStatus(200)
  })
  .get(Cors, verifyToken, index)
  .post(Cors, verifyToken, createOrder)

ordersRouter
  .route('/:id')
  .options(corsWithOptions, (req, res) => {
    res.sendStatus(200)
  })
  .get(Cors, verifyToken, show)
  .put(Cors, verifyToken, update)
  .delete(Cors, verifyToken, deleteOrder)

ordersRouter
  .route('/:id/products')
  .options(corsWithOptions, (req, res) => {
    res.sendStatus(200)
  })
  .get(Cors, verifyToken, getOrderProducts)
  .post(Cors, verifyToken, addProduct)

export default ordersRouter
