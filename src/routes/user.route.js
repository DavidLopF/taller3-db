const { Router } = require("express");
const router = Router();

const { getUser } = require("../controller/user.controller");


router.get("/", getUser);


module.exports = router;