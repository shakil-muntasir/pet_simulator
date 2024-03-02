import { Request, Response } from 'express'
import httpStatus from 'http-status'

const index = (_: Request, response: Response) => {
    return response.status(httpStatus.OK).json('Hello, user!')
}

const userController = {
    index
}

export default userController
