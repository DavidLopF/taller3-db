const { Router } = require("express");
const router = Router();
const { addProduct, getError } = require("../controller/shopping_cart.controller");
const { validateJWT } = require("../middlewares/validate-jwt");


router.post("/add", [
    validateJWT,
], addProduct)

router.get("/error", getError)



module.exports = router;

