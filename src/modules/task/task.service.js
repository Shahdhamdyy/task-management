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