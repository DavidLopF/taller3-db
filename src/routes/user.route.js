const { Router } = require("express");
const router = Router();

const { getUser, getUserLogin } = require("../controller/user.controller");


router.get("/", getUser);

router.get("/login", getUserLogin);

module.exports = router;