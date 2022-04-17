const mongoose = require('mongoose');
const colors = require('colors');   

const dbConection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_CONECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('DB is connected succesfully'.blue);

    } catch (error) {
        console.log(error)
        throw new Error("Error in connection to DB".red);
    }
}


module.exports = {
    dbConection
};



