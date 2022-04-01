const mongoose = require('mongoose');
const colors = require('colors');

class MongoConection {

    //conectar a mongo por el constructor
    constructor() {
        try {
            this.mongoose = mongoose.connect(process.env.MONGO_CONECTION, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            console.log(colors.green('DB mongo connection successfull'));
        } catch (err) {
            console.log(colors.red(err));
        }
    }

    //hacer busqueda en modelos con parametro query
    async get(model, query) {
        return await this.mongoose.model(model).find({ query });
    }
}



module.exports = MongoConection;
    
