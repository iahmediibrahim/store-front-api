import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const { JWT_SEC } = process.env

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader: any = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, JWT_SEC as string, (err: any, user: any) => {
      if (err) res.status(403).json('Token is not valid')
      req.user = user
      next()
    })
  } else {
    return res.status(401).json('You are not authenticated!')
  }
}
export default verifyToken
