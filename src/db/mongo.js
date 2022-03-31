const mongoose = require('mongoose');
const colors = require('colors');

const dbConectionMongo = async () => {
    try{
        await mongoose.connect(process.env.MONGO_CONECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(colors.blue('DB mongo connection successfull'));
    }catch(error){
        console.log(error);
    }
}


module.exports = {
    dbConectionMongo
}