import ErrorCodes from './status-codes'

function InternalError(message: string){
    this.message = message
    this.status = ErrorCodes.INTERNAL_SERVER
}

function ForbiddenError(message: string){
    this.message = message
    this.status = ErrorCodes.FORBIDDEN
}

function BadRequestError(message: string = 'bad request') {
    this.message = message
    this.status = ErrorCodes.BAD_REQUEST
}

function NotFoundError(message: string = 'not found') {
    this.message = message
    this.status = ErrorCodes.NOT_FOUND
}

function UnauthorizedError(message: string = 'unauthorized') {
    this.message = message
    this.status = ErrorCodes.UNAUTHORIZED
}

export default {
    InternalError,
    ForbiddenError,
    BadRequestError,
    NotFoundError,
    UnauthorizedError
}