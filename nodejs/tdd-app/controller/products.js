const productModel = require('../models/Product');

exports.createProduct = (req, res, next) => {
  try{
    const createdProduct = productModel.create(req.body);
    console.log('createdProduct', createdProduct);
    res.status(201).json(createdProduct);
  } catch(error) {
    next(error);
  }

}