const prisma = require('../database');

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

const findProducts = async ({ offset, pageSize, filterQuery, orderBy }) => {
  const products = await prisma.product.findMany({
    skip: offset,
    take: pageSize,
    where: filterQuery,
    orderBy: orderBy,
  });
  return products;
};

const createProduct = async ({ name, price }) => {
  const newProduct = await prisma.product.create({
    data: {
      name,
      price,
    },
  });
  return newProduct;
};

const deleteProductById = async ({ id }) => {
  try {
    await findProductById({ id });
  } catch (error) {
    throw error;
  }

  const deletedProduct = await prisma.product.delete({
    where: {
      id,
    },
  });

  return deletedProduct;
};

const updateProductById = async ({ id, name, price }) => {
  try {
    await findProductById({ id });
  } catch (error) {
    throw error;
  }

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
};
