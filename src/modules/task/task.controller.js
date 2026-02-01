import { Router } from 'express'
import { createTaskService , getMyTasksService} from './task.service.js'
import { validate } from '../../middlewares/validate.middleware.js'
import { createTaskSchema } from './task.validation.js'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
const router = Router()
router.post('/create', authMiddleware, validate(createTaskSchema), async (req, res, next) => {
    try {
        const { title, description } = req.body
        const userId = req.user.id
        const task = await createTaskService({ title, description, userId })
        res.status(201).json({
            message: 'Task created successfully',
            task
        })
    } catch (error) {
        next(error)
    }


})

router.get('/my-tasks', authMiddleware, async (req, res, next) => {
    try {
        const userId = req.user.id
        const tasks = await getMyTasksService(userId)
        res.status(200).json({
            message: 'Tasks fetched successfully',
            tasks
        })
    } catch (error) {
        next(error)
    }
})

export default router;