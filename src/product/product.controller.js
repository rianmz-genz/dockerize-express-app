const express = require('express');
const {
  getAllProducts,
  createNewProduct,
  deleteProduct,
  getProductById,
  updateProduct,
} = require('./product.service');
const { validationResult } = require('express-validator');
const { productValidation } = require('./product.validator');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    // Filtering
    const name = req.query.name || ''; // Assuming filter is a string
    const filterQuery = name ? { name: { contains: name } } : {};

    // Sorting
    const sortOrder = req.query.sortOrder || 'asc'; // Default to ascending
    const sortField = req.query.sortField || 'id'; // Default to sorting by ID
    const orderBy = { [sortField]: sortOrder };

    const meta = {
      offset,
      pageSize,
      filterQuery,
      orderBy,
    };

    const products = await getAllProducts(meta);

    return res
      .json({
        data: products,
        message: 'Success get all products',
        status: true,
        meta,
      })
      .status(200);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      status: false,
    });
  }
});

router.post('/', productValidation, async (req, res) => {
  const reqBody = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      message: errors.array().map((item) => item.msg),
    });
  }
  try {
    const newProduct = createNewProduct(reqBody);
    return res.json({
      data: newProduct,
      status: true,
      message: 'Success create new product',
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      status: false,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  if (!productId) {
    return res
      .json({
        status: false,
        message: 'Missing product id',
      })
      .status(400);
  }

  try {
    const deletedProduct = await deleteProduct({ id: productId });
    return res.json({
      status: false,
      message: 'Success delete product',
      data: deletedProduct,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      status: false,
    });
  }
});

router.get('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  if (!productId) {
    return res
      .json({
        status: false,
        message: 'Missing product id',
      })
      .status(400);
  }

  try {
    const product = await getProductById({ id: productId });
    return res.json({
      status: false,
      message: 'Success get product by id',
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      status: false,
    });
  }
});

router.put('/:id', productValidation, async (req, res) => {
  const productId = parseInt(req.params.id);
  const reqBody = req.body;

  if (!productId) {
    return res
      .json({
        status: false,
        message: 'Missing product id',
      })
      .status(400);
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      message: errors.array().map((item) => item.msg),
    });
  }

  try {
    const product = await updateProduct({ id: productId, reqBody });
    return res.json({
      status: false,
      message: 'Success update product by id',
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      status: false,
    });
  }
});

module.exports = router;