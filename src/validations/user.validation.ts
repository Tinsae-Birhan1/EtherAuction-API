import Joi from 'joi';
import { password } from './custom.validation';

const createUserSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().custom(password).required(),
  }),
});

export default createUserSchema;
