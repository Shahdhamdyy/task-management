import userModel from '../../database/models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwtSecret, jwtExpiration } from '../../../config/env.service.js'

export const registerService = async ({ name, email, password }) => {
    const existingUser = await userModel.findOne({ where: { email } })
    if (existingUser) {
        throw new Error('User already exists')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    return userModel.create({ name, email, password: hashedPassword })
}


export const loginService = async ({ email, password }) => {
    const user = await userModel.findOne({ where: { email } })
    if (!user) {
        throw new Error('Invalid email or password')
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new Error('Invalid email or password')
    }
    const token = jwt.sign(
        { id: user.id, email: user.email },
        jwtSecret,
        { expiresIn: jwtExpiration }
    )
    return {
        user, token
    }


}