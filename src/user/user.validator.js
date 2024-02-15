const { body } = require('express-validator');

const userValidation = [
  body('email').notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Price is required'),
];

module.exports = {
  userValidation,
};
