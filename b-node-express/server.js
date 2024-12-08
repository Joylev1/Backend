const express = require("express")

const app = express()

const PORT = 8008

app.get("/", (req, res) => {
    res.send("bello ")
})

app.listen(PORT, () => {
    console.log(`app listening on ${PORT}`)
})