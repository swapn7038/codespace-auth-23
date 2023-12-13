const mongoose = require("mongoose")

const {MONGO_URI} = process.env

exports.connect = () => {
    console.log(typeof MONGO_URI)
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('connected to db');
       }
    )
    .catch((error) => {
        console.log('Connection failed DB');
        console.log(error);
        process.exit(1)
    })
}