const express = require('express');
const { userValidation } = require('./user.validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const { registerUser, loginUser } = require('./user.service');
const { validationResult } = require('express-validator');

router.post('/register', userValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      message: errors.array().map((item) => item.msg),
    });
  }

  const email = req.body.email;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const newUser = await registerUser({ email, hashedPassword });
    return res.json({
      status: true,
      message: 'Succes registered user',
      data: newUser,
    });
  } catch (error) {
    return res
      .json({
        status: false,
        message: error.message,
      })
      .status(400);
  }
});

router.post('/login', userValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      message: errors.array().map((item) => item.msg),
    });
  }

  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await loginUser({ email, password });
    return res.json({
      status: true,
      message: 'Succes login user',
      data: user,
    });
  } catch (error) {
    return res
      .json({
        status: false,
        message: error.message,
      })
      .status(401);
  }
});

module.exports = router;
