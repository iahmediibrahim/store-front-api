import express, { NextFunction, Request, Response } from 'express'
import { Cors, corsWithOptions } from './cors'

const productsRouter = express.Router()

productsRouter
  .route('/')
  .options(corsWithOptions, (req, res) => {
    res.sendStatus(200)
  })
  // eslint-disable-next-line no-unused-vars
  .get(Cors, (req: Request, res: Response, next: NextFunction) => {
    res.send('user test api is successfull')
  })
export default productsRouter
