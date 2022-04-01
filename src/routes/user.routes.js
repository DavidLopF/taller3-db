const { Router } = require("express");
const router = Router();

const { getUser, postUser, getUserLogin } = require("../controller/user.controller");


router.get("/registration", getUser);

router.post("/post", postUser);




module.exports = router;