import Joi from 'joi'

export const createTaskSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    description: Joi.string().min(5).required(),


})