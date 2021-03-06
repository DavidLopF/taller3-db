const postgres = require("../db/postgres");
const marketplace = new postgres();
const bcrypt = require("bcryptjs");


const { generateJSW_Buyer, generateJSW_Supplier } = require("../helpers/generate-jws");

//____________________________________Imports__________________________________________


const register = (req, res) => {
    const type = req.body.type;

    //encriptar contraseña
    let pass = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    pass = bcrypt.hashSync(pass, salt);


    const body = req.body;

    marketplace.query(`INSERT INTO public.user (id_number_type,id_document, full_name, email, password, cellphone, address, city) 
    VALUES ('${body.dni_type}', '${body.dni}', '${body.name}', '${body.email}' , '${pass}', '${body.cellphone}', '${body.address}', '${body.city}')`)
        .then(result => {
            marketplace.query(`SELECT * FROM public.user WHERE email = '${body.email}'`)
                .then(result => {

                    const id = result.rows[0].id;
                    const user = result.rows[0];
                    if (type == "supplier") {
                        marketplace.query(`INSERT INTO public.supplier (user_id) 
                        VALUES ('${result.rows[0].id}')`)
                            .then(async result => {

                                const token = await generateJSW_Supplier(id);

                                res.render('user', {
                                    user,
                                    supplier: true,
                                    token
                                });
                            })
                    } else if (type == "buyer") {
                        marketplace.query(`INSERT INTO public.buyer (user_id) 
                        VALUES ('${result.rows[0].id}')`)
                            .then(async result => {

                                const token = await generateJSW_Buyer(id);

                                res.render('user', {
                                    user,
                                    buyer: true,
                                    token
                                });

                            })
                    }

                })
        })
        .catch(err => {
            res.status(400).json({
                ok: false,
                message: err
            });
        });
}

const getViewRegister = (req, res) => {
    res.render('auth/register');
}

const getViewLogin = (req, res) => {
    res.render('auth/login');
}


const login = (req, res) => {
    const { email, password } = req.body;

    marketplace.query(`SELECT * FROM public.user WHERE email = '${email}'`)
        .then(result => {
            if (result.rows.length > 0) {
                const user = result.rows[0];
                //validar contraseña
                const pass = bcrypt.compareSync(password, user.password);


                if (pass) {
                    marketplace.query(`SELECT * FROM public.supplier WHERE user_id = '${user.id}'`).then(async result => {
                        if (result.rows.length > 0) {
                            const token = await generateJSW_Supplier(user.id);

                            res.render('user', {
                                user,
                                type: 'Supplier',
                                supplier: true,
                                token
                            });

                        } else {
                            marketplace.query(`SELECT * FROM public.buyer WHERE user_id = '${user.id}'`).then(async result => {
                                if (result.rows.length > 0) {
                                    const token = await generateJSW_Buyer(user.id);
                                    res.render('user', {
                                        user,
                                        type: 'Buyer',
                                        buyer: true,
                                        token
                                    });
                                } else {
                                    res.status(400).json({
                                        ok: false,
                                        message: 'User not found'
                                    })
                                }
                            })
                        }
                    })
                } else {
                    res.render('error', {
                        message: 'Contraseña incorrecta',
                        url: '/auth/login'
                    })
                }
            }
        })
        .catch(err => {
            res.status(400).json({
                ok: false,
                message: err
            });
        }
        );
}





module.exports = {
    register,
    login,
    getViewRegister,
    getViewLogin
}