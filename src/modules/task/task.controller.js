import { Router } from 'express'
import { createTaskService, getMyTasksService, updateTaskService, deleteTaskService } from './task.service.js'
import { validate } from '../../middlewares/validate.middleware.js'
import { createTaskSchema, updateTaskSchema } from './task.validation.js'
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

router.put('/update/:taskId', authMiddleware, validate(updateTaskSchema), async (req, res, next) => {
    try {
        const { taskId } = req.params
        const { title, description, status } = req.body
        const userId = req.user.id
        const task = await updateTaskService({ taskId, userId, data: { title, description, status } })
        res.status(200).json({
            message: 'Task updated successfully',
            task
        })
    } catch (error) {
        next(error)
    }
})



router.delete('/delete/:taskId', authMiddleware, async (req, res, next) => {
    try {
        const { taskId } = req.params
        const userId = req.user.id
        const task = await deleteTaskService({ taskId, userId })
        res.status(200).json({
            message: 'Task deleted successfully',
            task
        })
    } catch (error) {
        next(error)
    }
})

export default router;