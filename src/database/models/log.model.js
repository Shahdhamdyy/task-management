import sequelize from '../connection.js'
import { DataTypes } from 'sequelize'

const logModel = sequelize.define('Log', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

}, {
    tableName: 'logs',
    timestamps: true

})
export default logModel;