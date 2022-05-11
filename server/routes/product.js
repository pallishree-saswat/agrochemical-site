const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  create,
  read,
  listAll,
  remove,
  update,
  productStar,
  listRelated,
  productsCount,
  list,
  searchFilters,
} = require("../controllers/product");

// routes
router.post("/product", authCheck, create);
router.get("/products/total", productsCount);

router.get("/products/:count", listAll); // products/100

router.delete("/product/:slug", authCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, update);

router.post("/products", list);
// rating
router.put("/product/star/:productId", authCheck, productStar);
// related
router.get("/product/related/:productId", listRelated);
// search
router.post("/search/filters", searchFilters);

module.exports = router;
