import validator from 'validator';
import { CustomHelpers } from 'joi';

const password = (value: any, helpers: CustomHelpers) => {
  if (!validator.isStrongPassword(value)) {
    return helpers.message({
      custom: 'Password should at least be 8 characters with one uppercase and lowercase letter, number, and special character',
    });
  }
  return value;
};

const objectId = (value: any, helpers: CustomHelpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message({
      custom: "'{{#label}}' must be a valid mongo id.",
    });
  }
  return value;
};

export {
  password,
  objectId,
};



