const postgres = require('../db/postgres');
const marketplace = new postgres();
const Cache = require('../db/redis');
const cache = new Cache();
const colors = require('colors');
//_________________________imports___________________________________________________

getViewProduct = function (req, res) {

    const id = req.params.id;

    const query = `SELECT * FROM public.products WHERE id = ${id}`;
    marketplace.query(query).then((result) => {
        const product_detail = 'SELECT * FROM public.product_details WHERE product_id = ' + id;
        marketplace.query(product_detail).then((result2) => {

            res.render(`product`, {
                product: result.rows[0],
                product_detail: result2.rows[0]
            });
        });
    });
}

const getByCategory = async (req, res) => {

    const id = req.params.id;

    try {
        const queryCache = await cache.get(`product_category_${id}`);

        if (queryCache) {
            res.status(200).json({
                ok: true,
                products: JSON.parse(queryCache)
            });
        } else {
            const query = `SELECT * FROM public.products WHERE product_categories_id = ${id}`;
            marketplace.query(query).then((result) => {
                cache.add('product_category_' + id, JSON.stringify(result.rows));
                res.status(200).json({
                    ok: true,
                    products: result.rows
                });
            });
        }
    } catch (err) {
        console.log(colors.bgRed.white(err));
        res.status(500).json({
            ok: false,
            err
        });
    }
}

//________________________________end methods_______________________________________

module.exports = {
    getViewProduct,
    getByCategory
}