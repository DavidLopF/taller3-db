const { Pool } = require('pg');
const colors = require('colors');


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

}

module.exports = PostgresConection;