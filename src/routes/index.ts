import { Router } from 'express'

import errorMiddleware from '@/middlewares/error'
import userRoutes from '@/routes/modules/user'

const routes = Router()

routes.use('/users', userRoutes)

// Catch all errors
routes.use(errorMiddleware)

export default routes
