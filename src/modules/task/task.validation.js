import Joi from 'joi'

export const createTaskSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    description: Joi.string().min(5).required(),


})

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).optional(),
  description: Joi.string().min(5).optional(),
  status: Joi.string().valid('todo', 'in-progress', 'done').optional()
})