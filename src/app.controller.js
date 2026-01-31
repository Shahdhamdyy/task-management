import express from 'express'
import { databaseConnection, databaseSync } from './database/connection.js'


export const bootstrap = async () => {
    const app = express()
    app.use(express.json())


    app.get('/test', (req, res) => {
        res.status(200).json({ message: 'API is running' })
    })
    await databaseConnection()
    await databaseSync()

    app.use((error, req, res, next) => {
        console.log({ message: error.message })
    })
    app.listen(3000, () => {
        console.log("server running on port 3000")
    })
}