import express, { NextFunction, Request, Response } from 'express'

const ordersRouter = express.Router()

// eslint-disable-next-line no-unused-vars
ordersRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('user test api is successfull')
})
export default ordersRouter
