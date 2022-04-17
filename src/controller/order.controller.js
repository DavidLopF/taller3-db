const jwt = require('jsonwebtoken');
const Marketplace = require('../db/postgres');
const marketplace = new Marketplace();



const createOrder = async (req, res) => {

    const { shoppingCart, payment, city, address } = req.body;

    if (shoppingCart.length !== 0) {
        let token = req.headers.authorization.split(" ")[1];
        const { uid } = jwt.verify(token, process.env.TOKEN_BUYER);

        const getBuyer = await marketplace.getBuyer(uid);
        const shop_car_id = await marketplace.createShoppingCart(getBuyer);
        let price = 0

        console.log('shopping car ', shop_car_id);


        shoppingCart.forEach(async (product) => {
            const productItem = `INSERT INTO public.product_items(product_id, shopping_car_id) VALUES ('${product.product_id}', '${shop_car_id}') RETURNING id`;
            const result = await marketplace.query(productItem);
            price += parseInt(product.product_price);

        });



        const checkOutProcess = `INSERT INTO public.checkout_process(shopping_car_id, buyer_id) VALUES ('${shop_car_id}', '${getBuyer}') RETURNING id`;
        const checkOutProcess_id = await marketplace.query(checkOutProcess);
        const paymentType = await marketplace.getPaymentType(payment.method);
        const card_id = await marketplace.validateCard(payment, getBuyer);
        const payment_final = await marketplace.createPayment(paymentType, card_id);
        const order = await marketplace.createOrder(payment_final, getBuyer, checkOutProcess_id, shop_car_id, price);

        res.json({
            ok: true,
            message: 'Orden creada correctamente'
        });

    } else {
        res.status(400).json({
            ok: false,
            message: 'No hay productos en el carrito'
        });
    }
};







module.exports = {
    createOrder
}