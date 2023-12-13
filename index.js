const express = require("express")

const app = express()

const PORT = 4000

app.get('/', (req, res) => {
    res.send("<h1>This is main route...</h1>")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})