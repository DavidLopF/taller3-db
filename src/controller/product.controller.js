getViewProduct = function(req, res) {

    const id = req.params.id;

    marketplace.query(`SELECT * FROM public.products WHERE id = '${id}'`)

    res.status(200).json({
        ok: true,
        message: 'View product'
    })
}

module.exports = {
    getViewProduct
}