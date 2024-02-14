const { body } = require('express-validator');

const productValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number'),
];

module.exports = {
  productValidation,
};
