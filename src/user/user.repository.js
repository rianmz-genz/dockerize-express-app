const prisma = require('../database');
const { v4: uuidv4 } = require('uuid');

const createUser = async ({ email, hashedPassword }) => {
  const newUser = prisma.user.create({
    data: {
      id: uuidv4(),
      email,
      password: hashedPassword,
    },
  });
  return newUser;
};

const findUserByEmail = async ({ email }) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return user;
};

const findUserById = async ({ id }) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  return user;
};
module.exports = {
  createUser,
  findUserByEmail,
};
