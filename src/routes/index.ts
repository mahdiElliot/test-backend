import app from 'express'
import statusCodes from '../utils/status-codes'
import { user } from '../models/user'
import userService from '../services/userService'
import Errors from '../utils/errors'
import errorMsgs from '../utils/error-messages/error-english'

const router = app.Router()

router.post('/users', (req, res) => {
    const user: user = req.body
    if (!user.email || !user.mobile || !user.username) {
        res.status(statusCodes.BAD_REQUEST).send(Errors.BadRequestError())
        return
    }
    if (user.password.length < 6) {
        res.status(statusCodes.FORBIDDEN).send(Errors.ForbiddenError(errorMsgs.password_short()))
        return
    }
    userService.save(user).then(() => {
        res.status(statusCodes.SUCCESSFUL).send({ username: user.username })
    }).catch(e => {
        res.status(e.status).send(e)
    })
})

export default router