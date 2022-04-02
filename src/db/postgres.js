const { Pool } = require('pg');
const colors = require('colors');


class PostgresConection {
    constructor() {
        try{
            this.pool = new Pool({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                password: process.env.DB_PASS,
                port: process.env.DB_PORT,
            });
        } catch(err) {
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

}

module.exports = PostgresConection;