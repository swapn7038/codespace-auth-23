require('dotenv').config()  
require("./database/database.js").connect();        
const express = require("express")
const Usre = require("./models/user.js");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const app = express()
app.use(express.json())

const PORT = 4000

app.get('/', (req, res) => {
    res.send("<h1>This is main route...</h1>")
})

app.post("/register", async (req, res) => {
    try {
        // get data from body or url
        const {firstName, lastName, email, password} = req.body
        // all data should exists 
        if(!(firstName && lastName && email && password)){
            res.status(400).send("All fields are compulsary...")
        }

        // check if user allready exists - email
        const existingUser = await User.findOne({ email })

        if(existingUser) {
            res.status(401).send("User allready existed...")
        }

        // encrypt the password
        const enCryptedPassword = await bcrypt.hash(password, 10)

        // save user in DB
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: enCryptedPassword

        })


        // generate token for user and send it
        const token = jwt.sign(
            {id: user._id, email}, "shhhh" ,
            // provide here something like process.env.jwtsecret
            {
                expiresIn: "2h"
            })

            user.token = token
            user.password = undefined

            res.status(201).json(user)
    } catch (error) {
        console.log(error);
    }
})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

module.exports = app