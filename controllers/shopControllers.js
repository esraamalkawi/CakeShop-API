const { Shop, Product } = require("../db/models");

exports.fetchShop = async (shopId, next) => {
  try {
    const foundShop = await Shop.findByPk(shopId);
    return foundShop;
  } catch (error) {
    next(error);
  }
};

exports.shopCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/${req.file.path}`;
    }
    req.body.userId = req.user.id;
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

// exports.shopDelete = async (req, res, next) => {
//   //  const {shopId}= req.params
//   try {
//     await req.shop.destroy();
//     res.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// };

exports.shopList = async (req, res, next) => {
  try {
    const shops = await Shop.findAll({
      attributes: ["id", "name"],
      include: {
        model: Product,
        as: "products",
        attributes: ["id"],
      },
    });
    res.json(shops);
  } catch (error) {
    next(error);
  }
};

// exports.shopUpdate = async (req, res, next) => {
//   try {
//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/${req.file.path}`;
//     }
//     await req.shop.update(req.body);
//     res.status(201).json(req.shop);
//   } catch (error) {
//     next(error);
//   }
// };

exports.productCreate = async (req, res, next) => {
  try {
    if (req.shop.userId === req.user.id) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/${req.file.path}`;
      }
      req.body.shopId = req.shop.id;
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
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
