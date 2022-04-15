const { Router } = require("express");
const router = Router();
const {addProduct} = require("../controller/shopping_cart.controller");


router.post("/add", [

], addProduct)



module.exports = router;

