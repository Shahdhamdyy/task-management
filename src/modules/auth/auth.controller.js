import { Router } from 'express'
import { registerSchema, loginSchema } from './auth.validation.js'
import { registerService, loginService } from './auth.service.js'
import { validate } from '../../middlewares/validate.middleware.js'

const router = Router()

router.post('/register', validate(registerSchema), async (req, res, next) => {
    try {

        const { name, email, password } = req.body
        const user = await registerService({ name, email, password })

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user.id,
                email: user.email
            }
        })
    } catch (error) {
        next(error)
    }
})

router.post('/login', validate(loginSchema), async (req, res, next) => {
    try {

        const { email, password } = req.body
        const { user, token } = await loginService({ email, password })
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email

            }
        })
    } catch (error) {
        next(error)
    }

})


export default router;