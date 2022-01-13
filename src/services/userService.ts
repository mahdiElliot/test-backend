import Errors from '../utils/errors'
import errorMsgs from '../utils/error-messages/error-english'
import User from '../models/user'
import { user } from '../models/user'
import bcrypt from 'bcrypt'

const save = async (user: user) => {
    try {
        const saltRounds = Number(process.env.PASS_SALT_ROUND || 10)
        const salt = await bcrypt.genSalt(saltRounds)
        const hashed = await bcrypt.hash(user.password, salt)
        const u = User.build({
            username: user.username, email: user.email, password: hashed,
            mobile: String(user.mobile), SSN: user.SSN
        })
        await u.save()
    } catch (e) {
        throw new Errors.InternalError(e.errors[0].message || errorMsgs.database_error())
    }
}

const findByEmail = async (email: string, password: string) => {
    let user = {} as any
    try {
        user = await User.findOne({ where: { email } })
        if (user === null)
            throw new Errors.NotFoundError("user not found")

        if (!await bcrypt.compare(password, user.password))
            throw new Errors.UnauthorizedError("incorrect password")

    } catch (e) {
        const error = e.errors ? e.errors[0].message : e.message
        throw new Errors.InternalError(error || errorMsgs.database_error())
    }
    return user as user
}
export default {
    save,
    findByEmail
}