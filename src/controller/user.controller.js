const getUser = (req, res) => {
    res.render('user', {
        title: 'Sergio'
    });
};

const postUser = (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'Post user'
    });
};

const getProduct = (req, res) => {
    res.render('product')
}

module.exports = {
    getUser,
    postUser,
    getProduct
};