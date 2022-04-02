const postgres = require('../db/postgres')
const marketplace = new postgres();

const existUser = (req, res, next) => {
    const { email, dni } = req.body;

    marketplace.query(`SELECT * FROM public.user WHERE email = '${email}' OR id_document = '${dni}'`)
        .then(result => {
            if (result.rowCount === 0) {
                next();
            } else {
                res.status(400).json({
                    ok: false,
                    message: 'User already exists'
                })
            }
        })

}

module.exports = {
    existUser
}