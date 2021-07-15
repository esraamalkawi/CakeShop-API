const { Product, Shop } = require("../db/models");

exports.fetchProduct = async (productId, next) => {
  try {
    const foundProduct = await Product.findByPk(productId);
    return foundProduct;
  } catch (error) {
    next(error);
  }
};

exports.productDelete = async (req, res, next) => {
  try {
    // const shop = Shop.findByPk(req.product.shopId);
    if (req.shop.userId === req.user.id) {
      await req.product.destroy();
      res.status(204).end();
    } else {
      next({
        status: 401,
        message: "unautharized",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.producList = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.productUpdate = async (req, res, next) => {
  try {
    if (req.shop.userId === req.user.id) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/${req.file.path}`;
      }
      await req.product.update(req.body);
      res.status(201).json(req.product);
    } else {
      next({
        status: 401,
        message: "unautharized",
      });
    }
  } catch (error) {
    next(error);
  }
};
