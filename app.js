require('dotenv').config()  
require("./database/database.js").connect();        
const express = require("express")
const User = require("./models/user.js");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())

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

app.post('.login', async(req, res) => {
    try {
      // get all data from frontend or user
      const {email, password} = req.body
  
      // add validation
      if(!(email && password)){
          res.status(400).send("Send all the data please...");
      }
      // find user in DB
      const user = await User.findOne({email})
  
      // Assignment - What if there is not user
      if(!(user)){
          console.log('Register... This is not a registered email');
          process.exit(1);
      }
      // match the password
      if(user && (await bcrypt.compare(password, user.password))){
          const token = jwt.sign(
            {id:user._id},
            "shhhh",
            {
                expiresIn:"2h"
            }
          );

          user.token = token
          user.password = password
      }

      // cookie section
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly : true
    }
    res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user
    })

    
      // send a token
    } catch (error) {
      console.log(error)
    }
  })


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

module.exports = app