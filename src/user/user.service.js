const { generateToken } = require('../database/token');
const { findUserByEmail, createUser } = require('./user.repository');
const bcrypt = require('bcrypt');

const registerUser = async ({ email, hashedPassword }) => {
  const existingUSer = await findUserByEmail({ email, id: null });
  if (existingUSer) {
    throw Error('Email already registered');
  }

  const newUser = await createUser({ email, hashedPassword });
  return newUser;
};

const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error('Email atau password salah');
  }
  const token = await generateToken(user);
  user.token = token;
  return user;
};

module.exports = {
  registerUser,
  loginUser,
};
