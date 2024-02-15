const prisma = require('../database');
const { v4: uuidv4 } = require('uuid');
const findProductById = async ({ id }) => {
  const product = await prisma.product.findFirst({
    where: {
      id,
    },
  });

  if (!product) {
    throw new Error('Data not found');
  }
  return product;
};

const countProducts = async () => {
  const count = await prisma.product.count();
  return count;
};

const findProducts = async ({ offset, pageSize, filterQuery, orderBy }) => {
  const products = await prisma.product.findMany({
    skip: offset,
    take: pageSize,
    where: filterQuery,
    orderBy: orderBy,
  });
  return products;
};

const createProduct = async ({ name, price, userId }) => {
  try {
    const newProduct = await prisma.product.create({
      data: {
        id: uuidv4(),
        name,
        price,
        userId,
      },
    });
    return newProduct;
  } catch (error) {
    throw Error(error);
  }
};

const deleteProductById = async ({ id }) => {
  const deletedProduct = await prisma.product.delete({
    where: {
      id,
    },
  });

  return deletedProduct;
};

const updateProductById = async ({ id, name, price }) => {
  const updatedProduct = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      price,
    },
  });

  return updatedProduct;
};

module.exports = {
  findProducts,
  createProduct,
  deleteProductById,
  updateProductById,
  findProductById,
  countProducts,
};
