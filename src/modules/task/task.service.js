import taskModel from '../../database/models/task.model.js'
import logModel from '../../database/models/log.model.js'

export const createTaskService = async ({ title, description, userId }) => {
    const task = await taskModel.create({ title, description, userId })
    await logModel.create({ action: 'CREATE_TASK', userId, taskId: task.id })
    return task
}


export const getMyTasksService = async (userId) => {
    return await taskModel.findAll({
        where: {
            userId
        },
        order: [['createdAt', 'DESC']]


    })
}


export const updateTaskService = async ({ taskId, userId, data }) => {
    const task = await taskModel.findOne({ where: { id: taskId, userId } })
    if (!task) {
        throw new Error('Task not found')
    }
    await task.update(data)
    await logModel.create({ action: 'UPDATE_TASK', userId, taskId: task.id })
    return task
}

export const deleteTaskService = async ({ taskId, userId }) => {
    const task = await taskModel.findOne({ where: { id: taskId, userId } })
    if (!task) {
        throw new Error('Task not found')
    }

    await logModel.create({ action: 'DELETE_TASK', userId, taskId: task.id })
    await task.destroy()
    return task


}