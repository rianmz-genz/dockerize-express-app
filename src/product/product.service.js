const {
  findProducts,
  createProduct,
  deleteProductById,
  findProductById,
  updateProductById,
  countProducts,
} = require('./product.repository');

const getAllProducts = async ({ offset, pageSize, filterQuery, orderBy }) => {
  const products = await findProducts({
    offset,
    pageSize,
    filterQuery,
    orderBy,
  });

  if (products.length == 0) {
    throw Error('Product is empty');
  }
  const totalProducts = await countProducts(); // Menghitung total produk sesuai dengan filterQuery

  const metadata = {
    totalProducts,
    limit: pageSize,
    currentPage: Math.floor(offset / pageSize) + 1,
    totalPages: Math.ceil(totalProducts / pageSize),
  };

  return { products, metadata };
};

const getProductById = async ({ id }) => {
  const product = await findProductById({ id });
  return product;
};

const createNewProduct = async ({ reqBody, userId }) => {
  const name = reqBody.name;
  const price = reqBody.price;
  const newProduct = await createProduct({
    name,
    price,
    userId,
  });
  return newProduct;
};

const updateProduct = async ({ id, reqBody }) => {
  const name = reqBody.name;
  const price = reqBody.price;
  try {
    await findProductById({ id });
  } catch (error) {
    throw error;
  }
  const newProduct = await updateProductById({
    id,
    name,
    price,
  });
  return newProduct;
};

const deleteProduct = async ({ id }) => {
  try {
    await findProductById({ id });
  } catch (error) {
    throw error;
  }
  const deletedProduct = await deleteProductById({ id });
  return deletedProduct;
};

module.exports = {
  getAllProducts,
  createNewProduct,
  deleteProduct,
  getProductById,
  updateProduct,
};
