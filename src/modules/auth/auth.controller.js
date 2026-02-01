import { Router } from 'express'
import { registerValidation, loginValidation } from './auth.validation.js'
import { registerService, loginService } from './auth.service.js'
import { validationResult } from 'express-validator'
const router = Router()

router.post('/register', registerValidation, async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

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

router.post('/login', loginValidation, async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
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