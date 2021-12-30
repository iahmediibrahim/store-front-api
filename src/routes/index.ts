import express from 'express'
import authRouter from './api/auth'
import usersRouter from './api/user'

const routes = express.Router()

routes.use('/auth', authRouter)
routes.use('/users', usersRouter)
export default routes
