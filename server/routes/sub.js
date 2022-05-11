const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { create, read, update, remove, list } = require("../controllers/sub");

// routes
router.post("/sub", authCheck, create);
router.get("/subs", list);
router.get("/sub/:slug", read);
router.put("/sub/:slug", authCheck, update);
router.delete("/sub/:slug", authCheck, remove);

module.exports = router;
