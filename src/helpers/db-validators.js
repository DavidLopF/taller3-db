const postgres = require('../db/postgres')
const marketplace = new postgres();

const ValidateUniqueUser = (req, res, next) => {
    const { email, dni } = req.body;

    marketplace.query(`SELECT * FROM public.user WHERE email = '${email}' OR id_document = '${dni}'`)
        .then(result => {
            if (result.rowCount === 0) {
                next();
            } else {
                res.render('error', {
                    message: 'User already exists, plase user another email and dni',
                    url: '/auth/login'
                });
            }
        }
    )
}

const existUser = (req, res, next) => {
    const { email } = req.body;

    marketplace.query(`SELECT * FROM public.user WHERE email = '${email}'`)
        .then(result => {
            if (result.rowCount === 0) {
                res.render('error', {
                    message: 'User not found',
                    url: '/auth/register'
                })

            } else {
                next();
            }
        }
    )

}
module.exports = {
    ValidateUniqueUser,
    existUser
}