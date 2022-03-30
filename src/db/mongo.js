const mongoose = require('mongoose');

const dbConectionMongo = async () => {
    try{
        await mongoose.connect(process.env.MONGO_CONECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected'.green);
    }catch(error){
        console.log(error);
    }
}


module.exports = {
    dbConectionMongo
}