const { Schema, model } = require('mongoose');


const orderSchema = new Schema({

    order_id: {
        type: Number,
        required: true
    },
    buyer_id: {
        type: Number,
        required: true
    },
    payment_id: {
        type: Number,
        required: true
    },
    checkout_process_id: {
        type: Number,
        required: true
    },
    shopping_car_id: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    address: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        } 
    }
});

module.exports = model('Order', orderSchema);
