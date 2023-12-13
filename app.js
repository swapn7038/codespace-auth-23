const express = require("express")
require('dotenv').config()
// const { connect } = require("mongoose")

require("./database/database.js").connect();

const app = express()
app.use(express.json())

const PORT = 4000

app.get('/', (req, res) => {
    res.send("<h1>This is main route...</h1>")
})

app.post("/register", async (req, res) => {
    try {
        // get data from body or url
        // all data should exists 
        // check if user allready exists
        // encrypt the password
        // save user in DB
        // generate token for user and send it
    } catch (error) {
        console.log(error);
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

module.exports = app