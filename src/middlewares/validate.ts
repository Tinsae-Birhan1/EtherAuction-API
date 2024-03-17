import Joi, { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

const validate = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const keys = Object.keys(schema);
  const object: any = keys.reduce((obj, key) => {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
      obj[key] = req[key];
    }
    return obj;
  }, {});
  const { error } = schema.validate(object); 
  if (error) {
    const errors = error.details.map((detail) => detail.message).join(',');
    return next(new ApiError(400, errors));
  }
  return next();
};

export default validate;
