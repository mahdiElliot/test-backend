import sequelize from '../db/index'
import DataTypes from 'sequelize'
import Errors from '../utils/errors'
import errorMsgs from '../utils/error-messages/error-english'

export type user = {
    id: number
    username: string
    password: string
    email: string
    mobile: string
    SSN: string
}

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            validateEmail: (value) => {
                if (!(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(value)))
                    throw new Errors.ForbiddenError(errorMsgs.invalid_email())
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile: {
        type: DataTypes.STRING,
        validate: { len: [11, 11] },
        allowNull: false,
    },
    SSN: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
})

export default User