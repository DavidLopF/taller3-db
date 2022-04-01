const postgres = require("../db/postgres");
const marketplace = new postgres();
const bcrypt = require("bcryptjs");


const { generateJSW_Buyer, generateJSW_Supplier } = require("../helpers/generate-jws");


//____________________________________Imports__________________________________________


const register =  (req, res) => {
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
                    if (type == "supplier") {
                        marketplace.query(`INSERT INTO public.supplier (user_id) 
                        VALUES ('${result.rows[0].id}')`)
                            .then( async result => {

                                const token = await generateJSW_Supplier(id);

                                res.status(200).json({
                                    ok: true,
                                    message: 'Supplier created',
                                    token
                                })
                            })
                    } else if (type == "buyer") {
                        marketplace.query(`INSERT INTO public.buyer (user_id) 
                        VALUES ('${result.rows[0].id}')`)
                            .then(async result => {

                                const token = await generateJSW_Buyer(id);
                                res.status(200).json({
                                    ok: true,
                                    message: 'Buyer created',
                                    token
                                })
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



module.exports = {
    register
}