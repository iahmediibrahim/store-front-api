import express from 'express'
import {
  createOrder,
  userActiveOrders,
  userCompletedOrders,
  usersOrders
} from '../../handlers/Orders'
import {
  create,
  deleteUser,
  index,
  login,
  show,
  update
} from '../../handlers/Users'
import verifyToken from '../../middleware/verifyToken'
import { Cors, corsWithOptions } from './cors'

const usersRouter = express.Router()
usersRouter
  .route('/')
  .options(corsWithOptions, (req, res) => {
    res.sendStatus(200)
  })
  .get(Cors, verifyToken, index)

usersRouter
  .route('/:id')
  .options(corsWithOptions, (req, res) => {
    res.sendStatus(200)
  })
  .get(Cors, verifyToken, show)
  .put(Cors, verifyToken, update)
  .delete(Cors, verifyToken, deleteUser)

usersRouter
  .route('/signup')
  .options(corsWithOptions, (req, res) => {
    res.sendStatus(200)
  })
  .post(Cors, create)
usersRouter
  .route('/login')
  .options(corsWithOptions, (req, res) => {
    res.sendStatus(200)
  })
  .post(Cors, login)
usersRouter
  .route('/:id/orders')
  .options(corsWithOptions, (req, res) => {
    res.sendStatus(200)
  })
  .get(Cors, verifyToken, usersOrders)
  .post(Cors, verifyToken, createOrder)

usersRouter
  .route('/:id/orders/active')
  .options(corsWithOptions, (req, res) => {
    res.sendStatus(200)
  })
  .get(Cors, verifyToken, userActiveOrders)
usersRouter
  .route('/:id/orders/completed')
  .options(corsWithOptions, (req, res) => {
    res.sendStatus(200)
  })
  .get(Cors, verifyToken, userCompletedOrders)
export default usersRouter
