const {
  findProducts,
  createProduct,
  deleteProductById,
  findProductById,
  updateProductById,
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

  return products;
};

const getProductById = async ({ id }) => {
  const product = await findProductById({ id });
  return product;
};

const createNewProduct = async (reqBody) => {
  const name = reqBody.name;
  const price = reqBody.price;
  const newProduct = await createProduct({
    name,
    price,
  });
  return newProduct;
};

const updateProduct = async ({ id, reqBody }) => {
  const name = reqBody.name;
  const price = reqBody.price;
  const newProduct = await updateProductById({
    id,
    name,
    price,
  });
  return newProduct;
};

const deleteProduct = async ({ id }) => {
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
