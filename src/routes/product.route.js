const { Router } = require("express");
const router = Router();

const  {getViewProduct} = require("../controller/product.controller");


router.get("/:id", getViewProduct )
module.exports = router;