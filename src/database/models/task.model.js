import sequelize from '../connection.js'
import { DataTypes } from 'sequelize'
import userModel from './user.model.js'

const taskModel = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('todo', 'in-progress', 'done'),
        allowNull: false,
        defaultValue: 'todo'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: userModel,
            key: 'id'
        }

    },
}
    , {
        tableName: 'tasks',
        timestamps: true

    })
export default taskModel
