const { Router } = require("express");
const router = Router();

const { getUser, postUser, getProduct} = require("../controller/user.controller");


router.get("/", getUser);
router.get("/product", getProduct)

router.post("/post", postUser);




module.exports = router;