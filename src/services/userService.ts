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
            username: user.username, email: user.email, password: hashed, mobile: String(user.mobile)
        })
        await u.save()
    } catch (e) {
        throw new Errors.InternalError(e.message || errorMsgs.database_error())
    }
}

export default {
    save
}