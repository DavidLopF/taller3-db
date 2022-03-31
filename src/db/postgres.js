const { Pool } = require('pg');
const colors = require('colors');


class DB {
    constructor() {
        try{
            this.pool = new Pool({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                port: process.env.DB_PORT,
            });
            console.log(colors.blue('DB postgres connection successfull'));
        } catch(err) {
            console.log(colors.red(err));
        }
    }

    async query(query, params) {
        return await this.pool.query(query, params);
    }

    async getAll(table) {
        const query = `SELECT * FROM ${table}`;
        const result = await this.query(query);
        return result.rows;
    }

}

module.exports = DB;