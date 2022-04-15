const jwt = require('jsonwebtoken');
const Cache = require('../db/redis')
const cache = new Cache()

const addProduct = async (req, res) => {
    let token = req.headers.authorization.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.TOKEN_BUYER);
    const { product } = req.body

    const getShoppingCart = await cache.get(`shopping_cart_${uid}`)
    if (getShoppingCart) {

        const shopingcart = JSON.parse(getShoppingCart)

        shopingcart.products.push({
            product_id: product.id,
            product_name: product.name,
            product_price: product.price,
            product_quantity: product.quantity,
            product_color: product.color,
        })

        cache.add_shoppingCart(`shopping_cart_${uid}`, JSON.stringify(shopingcart))

        res.status(200).json({
            ok: true,
            message: 'product added to shopping cart',
        })

    } else {
        const shopingcart = {
            user_id: uid,
            products: [{
                product_id: product.id,
                product_name: product.name,
                product_price: product.price,
                product_quantity: product.quantity,
                product_color: product.color,
            }]
        }
        const temp = await cache.add_shoppingCart('shopping_cart_' + uid, JSON.stringify(shopingcart));
        if (temp) {
            res.status(200).json({
                ok: true,
                message: 'product added to cart'
            })
        } else {
            res.status(500).json({
                ok: false,
                message: 'error'
            })
        }

    }
}


const getShoppingCart = async (req, res) => {
    let token = req.headers.authorization.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.TOKEN_BUYER);

    const getShoppingCart = await cache.get(`shopping_cart_${uid}`)
    if (getShoppingCart) {
        res.status(200).json({
            ok: true,
            message: 'shopping cart',
            shopping_cart: JSON.parse(getShoppingCart)
        })
    } else {
        res.status(200).json({
            ok: true,
            message: 'shopping cart',
            shopping_cart: {
                user_id: uid,
                products: []
            }
        })
    }
}


const getError = (req, res) => {
    res.render('error', {
        message: 'you are a supplier  or expired your session',
        url: '/auth/login'
    })
}

module.exports = {
    addProduct,
    getError,
    getShoppingCart
}

