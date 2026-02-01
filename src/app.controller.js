import express from 'express'
import { databaseConnection, databaseSync } from './database/connection.js'
import { userModel, taskModel, logModel } from './database/models/association.js'
import authRouter from './modules/auth/auth.controller.js'
import { rateLimiter } from './middlewares/rateLimit.middleware.js'
import dotenv from 'dotenv'
dotenv.config({ path: './config/.env' })
import taskRouter from './modules/task/task.controller.js'



export const bootstrap = async () => {
    const app = express()
    app.use(express.json())
    app.use(rateLimiter)


    app.get('/test', (req, res) => {
        res.status(200).json({ message: 'API is running' })
    })
    await databaseConnection()
    app.use('/auth', authRouter)
    app.use('/tasks', taskRouter)
    await databaseSync()

    app.use((error, req, res, next) => {
        res.status(500).json({ message: error.message })
    })

   const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
}