const { Router } = require("express");
const router = Router();

const { register, login, getViewRegister, getViewLogin } = require("../controller/auth.controller");
const { ValidateUniqueUser, existUser } = require("../helpers/db-validators");
const { validateData, validateRegisterBody, validateLogin } = require("../middlewares/export");

//____________________________________Imports__________________________________________


router.post("/register", [
    ValidateUniqueUser,
    validateRegisterBody,
    validateData
], register)

router.post("/login", [
    existUser,
    validateLogin,
    validateData
], login)


router.get('/register', getViewRegister)
router.get('/login', getViewLogin)

module.exports = router;


