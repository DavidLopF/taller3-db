const { Router } = require("express");
const router = Router();

const { register } = require("../controller/auth.controller");
const { existUser } = require("../helpers/db-validators");
const { validateData, validateRegisterBody } = require("../middlewares/export");

//____________________________________Imports__________________________________________


router.post("/register", [
    existUser,
    validateRegisterBody,
    validateData
], register)

module.exports = router;

