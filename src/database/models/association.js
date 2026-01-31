import userModel from './user.model.js'
import taskModel from './task.model.js'
import logModel from './log.model.js'

//1)User<>Task 
userModel.hasMany(taskModel, {
    foreignKey: 'userId',
    as: 'tasks',
    onDelete: 'CASCADE',

})
taskModel.belongsTo(userModel, {
    foreignKey: 'userId',
    as: 'user',

})

//2)User<>Log
userModel.hasMany(logModel, {
    foreignKey: 'userId',
    as: 'logs',

})
logModel.belongsTo(userModel, {
    foreignKey: 'userId',
    as: 'user',

})

//3)Task<>Log
taskModel.hasMany(logModel, {
    foreignKey: 'taskId',
    as: 'logs',

})
logModel.belongsTo(taskModel, {
    foreignKey: 'taskId',
    as: 'task',

})

export { userModel, taskModel, logModel }
