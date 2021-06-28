const express = require("express");
const upload = require("../middleware/multer");

const router = express.Router();

const {
  shopCreate,
  productCreate,
  shopList,
  //shopDelete,
  //shopUpdate,
  fetchShop,
} = require("../controllers/shopControllers");

router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    const err = new Error("Shop Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", shopList);

router.post("/", upload.single("image"), shopCreate);

router.post("/:shopId/products", upload.single("image"), productCreate);

//router.delete("/:shopId", shopDelete);

//router.put("/:shopId", upload.single("image"), shopUpdate);

module.exports = router;
