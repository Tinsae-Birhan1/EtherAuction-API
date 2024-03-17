import Joi from 'joi';

const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const refreshTokenSchema = Joi.object({
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }),
});




const authValidation = {
    loginSchema,
  refreshTokenSchema,
  };
  
  export default authValidation;
  