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

        cliente.on('connect', () => {
            console.log(colors.green('Redis connection successfull'));
        });

        cliente.on('error', (err) => {
            console.log(colors.red(err));
        });

        return cliente;
    }

    async get(key) {
        return await this.client.get(key);
    }

    async set(key, value) {
        return await this.client.get(key, value);
    }

    async del(key) {
        return await this.client.del(key);
    }

    async add(key, value) {
        return await this.client.sadd(key, value);
    }
}

module.exports = RedisConection;