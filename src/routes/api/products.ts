import express from 'express'
import {
  create,
  deleteProduct,
  getProductByCategory,
  index,
  show,
  update
} from '../../handlers/Products'
import verifyToken from '../../middleware/verifyToken'
import { Cors, corsWithOptions } from './cors'

const productsRouter = express.Router()
productsRouter
  .route('/')
  .options(corsWithOptions, (req, res) => {
    res.sendStatus(200)
  })
  .get(Cors, index)
  .post(Cors, verifyToken, create)

productsRouter
  .route('/:id')
  .options(corsWithOptions, (req, res) => {
    res.sendStatus(200)
  })
  .get(Cors, show)
  .put(Cors, verifyToken, update)
  .delete(Cors, verifyToken, deleteProduct)

productsRouter
  .route('/categories/:category')
  .options(corsWithOptions, (req, res) => {
    res.sendStatus(200)
  })
  .post(Cors, getProductByCategory)

export default productsRouter
