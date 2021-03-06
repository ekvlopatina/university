const express = require("express")
const PORT = process.env.PORT || 8080
const path = require("path")
const app = express()

app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


app.listen(PORT)