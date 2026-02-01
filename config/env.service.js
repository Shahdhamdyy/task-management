import dotenv from 'dotenv'
dotenv.config({ path: './config/.env' })
const databaseName = process.env.DATABASE_NAME
const databaseUser = process.env.DATABASE_USER
const databasePassword = process.env.DATABASE_PASSWORD
const databaseHost = process.env.DATABASE_HOST
const databasePort = process.env.DATABASE_PORT

const jwtSecret = process.env.JWT_SECRET
const jwtExpiration = process.env.JWT_EXPIRES_IN
export { databaseName, databaseUser, databasePassword, databaseHost, databasePort, jwtSecret, jwtExpiration }