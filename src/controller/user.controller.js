const res = require("express/lib/response");

const getUser = (req, res) => {
    res.render('user', {
        title: 'politas'
    });
};


const getUserLogin = (req, res) => {
    res.render('user_login')
}

const getPurchase = (req, res) => {
    res.render('purchase')
}

const getCart = (req, res) => {
    res.render('cart')
}


module.exports = {
    getUser,
    getUserLogin,
    getPurchase,
    getCart
};