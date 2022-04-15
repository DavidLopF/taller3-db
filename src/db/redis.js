const redis = require('ioredis');
const colors = require('colors');

class RedisConection {

    constructor() {
        this.client = this.connect();
    }

    connect() {
        let cliente = new redis({
            host: process.env.DB_HOST,
            port: 6379,
            retryStrategy: (times) => {
                let delay = Math.min(times * 100, 2000);
                return delay;
            },
            maxRetriesPerRequest: 3,
        });

        cliente.on('error', (err) => {
            console.log(colors.red(err));
        });

        return cliente;
    }

    async get(key) {
        return await this.client.get(key);
    }


    async add(key, value) {
        try {
            await this.client.set(key, value);
            await this.client.expire(key, 600);
            return true
        } catch (err) {
            console.log(colors.red(err));
            return false
        }
    }
}

module.exports = RedisConection;