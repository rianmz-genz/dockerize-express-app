const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const runningPort = process.env.RUNNING_PORT;
app.use(cors());
app.use(express.json());

const productController = require('./product/product.controller');

app.use('/products', productController);

app.listen(runningPort, () => {
  console.log('listening for requests on port ' + runningPort);
});
