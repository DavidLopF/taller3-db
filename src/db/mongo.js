const mongoose = require('mongoose');
const colors = require('colors');

class MongoConection {
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

    async insert(model, data) {
        try{
            const result = await model.create(data);
            return result;
        }catch(err){
            console.log(colors.red(err));
        }
    }

    
    async get(model, query) {
        return await this.mongoose.model(model).find({ query });
    }
}



module.exports = MongoConection;

