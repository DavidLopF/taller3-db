const validateRegisterBody = (req, res, next) => {
    const { dni_type, dni, name, cellphone, email, password, address, city, type } = req.body;
    console.log(req.body);

    if (!dni_type || !dni || !name || !cellphone || !email || !password || !address || !city || !type) {
        return res.status(400).json({
            ok: false,
            message: 'Missing data'
        })
    }


    next();
}


module.exports = {
    validateRegisterBody
}