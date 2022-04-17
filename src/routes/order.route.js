const { Router } = require("express");
const router = Router();
const { createOrder,getViewOrder } = require("../controller/order.controller");
const {check} = require('express-validator');
const {validateJWT, validateData} = require('../middlewares/export');
const { route } = require("./product.route");

router.get("/:id",getViewOrder );

router.post("/create",[
    check('address', 'address no found').not().isEmpty(),
    check('payment', 'payment no found').not().isEmpty(),
    check('shoppingCart', 'shoppingCart no found').not().isEmpty(),
    validateJWT,
    validateData
], createOrder);



module.exports = router;