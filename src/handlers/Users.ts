import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import ApiError from '../middleware/ApiError'
import store, { User } from '../models/User'

const { JWT_SEC } = process.env
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: User[] = await store.index()
    res.status(200).json(users)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRecord = await store.show(req.params.id)
    const user: User = {
      id: userRecord.id,
      first_name: userRecord.first_name,
      last_name: userRecord.last_name,
      username: userRecord.username
    }
    res.status(200).json(user)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newUser: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password
  }

  try {
    if (!newUser.username || !newUser.password) {
      res.json('Invalid arguments. username and password are Required!')
      return
    }
    const user: User = await store.create(newUser)
    const accessToken = jwt.sign({ user }, JWT_SEC as string, {
      expiresIn: '3d'
    })
    // eslint-disable-next-line camelcase
    const { password, password_digest, ...other } = user
    res.status(201).json({ ...other, accessToken })
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
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password
  }

  try {
    const updatedUser = await store.update(id, user)
    res.status(201).json(updatedUser)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  try {
    const deletedUser = await store.delete(id)
    res.status(201).json(deletedUser)
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User = await store.authintcateUser(
      req.body.username,
      req.body.password
    )
    if (user !== null) {
      const accessToken = jwt.sign({ user }, JWT_SEC as string)
      console.log(user)

      // eslint-disable-next-line camelcase
      const { password, password_digest, ...others } = user
      res.status(201).json({ ...others, accessToken })
    } else {
      next(ApiError.badRequest('Wrong User Credentials ...'))
    }
  } catch (error: any) {
    next(ApiError.internal(error.message))
  }
}
