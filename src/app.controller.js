import express from 'express'
import { databaseConnection, databaseSync } from './database/connection.js'
import { userModel, taskModel, logModel } from './database/models/association.js'
import authRouter from './modules/auth/auth.controller.js'

export const bootstrap = async () => {
    const app = express()
    app.use(express.json())


    app.get('/test', (req, res) => {
        res.status(200).json({ message: 'API is running' })
    })
    await databaseConnection()
    app.use('/auth', authRouter)
    await databaseSync()

    app.use((error, req, res, next) => {
        res.status(500).json({ message: error.message })
    })

    app.listen(3000, () => {
        console.log("server running on port 3000")
    })
}