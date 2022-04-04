const postgres = require('../db/postgres');
const marketplace = new postgres();

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

const getByCategory = (req, res) => {

    const id = req.params.id;

    const query = `SELECT * FROM public.products WHERE product_categories_id = ${id} LIMIT 5`;

    marketplace.query(query).then((result) => {
        res.status(200).json({
            ok: true,
            products: result.rows
        });
    });
}

module.exports = {
    getViewProduct,
    getByCategory
}