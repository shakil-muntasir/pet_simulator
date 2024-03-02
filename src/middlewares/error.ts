import { NextFunction, Request, Response, Router } from 'express'
import httpStatus from 'http-status'

import { Log } from '@/utils/logger'

const errorMiddleware = Router()

// Catch-all route for errors
errorMiddleware.use((error: Error, _request: Request, response: Response, next: NextFunction): void => {
    Log.error(error.message!, true)
    Log.writeToFile('ERROR', error.stack!)

    response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Internal server error'
    })

    next()
})

// Catch-all route for undefined routes
errorMiddleware.use((request: Request, response: Response, next: NextFunction) => {
    Log.error(`URL Not Found - ${request.originalUrl}`, true)

    response.status(httpStatus.NOT_FOUND).json({
        error: 'Not Found'
    })

    next()
})

export default errorMiddleware
