// 1. import/require mongoose
// 2. one variable jyat aapna schema store karu with const
// 3. nantar is eqlaus karun new keyword, nanter mongoose.Schema({ ... })
// 4. ... => create schema here
// 5. Export schema

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type:String,
        default:null
    },
    lastName: {
        type:String,
        default:null
    },
    email: {
        type:String,
        unique:true
    },
    password: {
        type:String
    },

    // Assignment
    token: {
       type: String,
    }
})

module.exports = mongoose.model("user", userSchema);