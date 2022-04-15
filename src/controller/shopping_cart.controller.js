const addProduct = (req, res) => {


    res.status(200).json({
        ok: true,
        message: req.body
    });
}


module.exports = {
    addProduct
}

