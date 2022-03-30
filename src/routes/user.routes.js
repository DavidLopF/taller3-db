const { Router } = require("express");
const router = Router();

const { getUser, postUser } = require("../controller/user.controller");


router.get("/", getUser);

router.post("/post", postUser);




module.exports = router;