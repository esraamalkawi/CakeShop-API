const express = require("express");
const upload = require("../middleware/multer");

// let products = require("../data");

const router = express.Router();

const {
  producList,
  productDelete,
  productUpdate,
  fetchProduct,
} = require("../controllers/productControllers");

router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    const err = new Error("Product Not Found");
    err.status = 404;
    next(err);
  }
});

//another way to import
// const{productControllers} = require("../controllers/productControllers");
router.get("/", producList);

router.delete("/:productId", productDelete);

router.put("/:productId", upload.single("image"), productUpdate);

module.exports = router;
// const express = require("express");
// const productControllers = require("../controllers/productControllers");
// const router = express.Router();

// //  Create products route
// router.post("/", productControllers.productCreate);

// //Delete products route
// router.delete("/:productID", productControllers.productDelete);

// //Update products route
// // router.put("/:productID", productCintroler.updateProducts);

// // Pruduct list
// router.get("/", productControllers.pruductList);

// // // Delaile of products
// // router.get("/:productID", productCintroler.delaileProduct);

// module.exports = router;
