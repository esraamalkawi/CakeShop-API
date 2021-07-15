const express = require("express");
const passport = require("passport");
const upload = require("../middleware/multer");
const router = express.Router();

const {
  signup,
  signin,
  shopCreate,
} = require("../controllers/userControolers");

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post("/signup", signup);

// router.post(
//   "/shops",
//   passport.authenticate("jwt", { session: false }),
//   upload.single("image"),
//   shopCreate
// );

module.exports = router;
