import express, { NextFunction, Request, Response } from 'express'

const cartsRouter = express.Router()

// eslint-disable-next-line no-unused-vars
cartsRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('user test api is successfull')
})
export default cartsRouter
