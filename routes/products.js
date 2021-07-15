const express = require("express");
const upload = require("../middleware/multer");
const passport = require("passport");

const router = express.Router();

const {
  producList,
  productDelete,
  productUpdate,
  fetchProduct,
} = require("../controllers/productControllers");
const { fetchShop } = require("../controllers/shopControllers");

router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    const shop = await fetchShop(product.shopId, next);
    req.shop = shop;
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

router.delete(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  productDelete
);

router.put(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productUpdate
);

// passport.authenticate("jwt", { session: false })
module.exports = router;
