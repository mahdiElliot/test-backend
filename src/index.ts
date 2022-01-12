import express from "express"
import dotenv from 'dotenv'
dotenv.config()

import sequelize from './db/index'

import routes from './routes'

const port = process.env.PORT || 8081

const app = express()

// middlewares
app.use(express.json())
app.use('/api', routes)

const start = async () => {
    try {
        await sequelize.sync()

        app.get('/', (req, res) => {

        })

        app.listen(port, () => {

        })

    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

start()