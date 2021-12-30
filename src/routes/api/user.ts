import express, { NextFunction, Response, Request } from 'express'

const usersRouter = express.Router()

// eslint-disable-next-line no-unused-vars
usersRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('user test api is successfull')
})
export default usersRouter
