const mongoose = require('mongoose');

try{
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_DB_URL)
} catch (err) {
    console.log(err)
}
