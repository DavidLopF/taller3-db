const { Pool } = require('pg');
const colors = require('colors');
const res = require('express/lib/response');


class PostgresConection {
    constructor() {

        const uri = 'postgres://gzbuvbqlqjbicm:d660032ea0be576a79e1a650218224d1e8a50f656bdbb0050f7ccdb6fc12d125@ec2-3-217-251-77.compute-1.amazonaws.com:5432/dbb96874eh79b'
        try {
            this.pool = new Pool({
                connectionString: uri,
                ssl: { rejectUnauthorized: false }
            });
        } catch (err) {
            console.log(colors.red(err));
        }

    }

    async query(query) {
        return await this.pool.query(query);
    }


    async getAll(table) {
        const query = `SELECT * FROM ${table}`;
        const result = await this.query(query);
        return result.rows;
    }

    async getBuyer(id) {
        const query = `SELECT * FROM public.buyer WHERE user_id = ${id}`;
        const result = await this.query(query);
        return result.rows[0].id;
    }

    async createShoppingCart(buyerId) {
        const query = `INSERT INTO public.shopping_cars(buyer_id) VALUES ('${buyerId}') RETURNING id`;
        const result = await this.query(query);
        return result.rows[0].id;
    }

    async getPaymentType(metohd) {
        if (metohd == 'Tarjeta de crédito') {
            const query = `SELECT * FROM public.payment_type WHERE type = 'credit card'`;
            const result = await this.query(query);
            return result.rows[0].id;
        } else {
            const query = `SELECT * FROM public.payment_type WHERE type = 'dedit card'`;
            const result = await this.query(query);
            return result.rows[0].id;
        }

    }

    async validateCard(payment, buyer_id) {
        let { card_number, cvc, date_expired } = payment;
        date_expired = date_expired.split('-');
        const name = 'jorge nitales'
        const query = `SELECT * FROM public.cards WHERE number_card = '${card_number}'`;
        const result = await this.query(query);

        if (result.rows.length > 0) {
            return result.rows[0].id;
        } else {
            const query = `INSERT INTO public.cards(number_card, cvv, name, expiration_month, expiration_year, buyer_id) VALUES ('${card_number}', '${cvc}', '${name}', '${date_expired[1]}','${date_expired[0]}', '${buyer_id}' ) RETURNING id`;
            const result = await this.query(query);
            return result.rows[0].id;
        }

    }

    async createPayment(payment_type, card_id) {
        const query = `INSERT INTO public.payment(payment_type_id, card_id) VALUES ('${payment_type}', '${card_id}') RETURNING id`;
        const result = await this.query(query);
        return result.rows[0].id;
    }

    async createOrder(payment_id, buyer_id, checkout_process_id, shop_car_id, price) {

        const query = `INSERT INTO public.order(payment_id, buyer_id, checkout_process_id, shopping_car_id, price, status) VALUES ('${payment_id}', '${buyer_id}', '${checkout_process_id.rows[0].id}', '${shop_car_id}', '${price}', 'en preparacion') RETURNING id`;
        const result = await this.query(query);
        return result.rows[0].id;
    }

}

module.exports = PostgresConection;