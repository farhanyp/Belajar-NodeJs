import Joi from "joi";

const registerValidation = Joi.object({
    username:   Joi.string().max(100).required(),
    password:   Joi.string().max(100).required(),
    name:       Joi.string().max(100).required()
})

const loginValidation = Joi.object({
    username:   Joi.string().max(100).required(),
    password:   Joi.string().max(100).required()
})

const getValidation = Joi.string().max(100).required()

const updateValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password:   Joi.string().max(100).optional(),
    name:       Joi.string().max(100).optional()
})

const logoutValidation = Joi.string().max(100).required()

export{
    registerValidation,
    loginValidation,
    getValidation,
    updateValidation,
    logoutValidation
}