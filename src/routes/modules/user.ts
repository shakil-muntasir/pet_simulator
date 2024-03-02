import { Router } from 'express'

import userController from '@/controllers/user'

const userRoutes = Router()

userRoutes.get('/', userController.index)

export default userRoutes
