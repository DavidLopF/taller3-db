const { Router } = require("express");
const router = Router();

const { getViewProduct, getByCategory } = require("../controller/product.controller");


router.get('/category/:id', getByCategory);

router.get("/:id", getViewProduct)
module.exports = router;