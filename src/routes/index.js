const express = require('express')
const app = express()
const port = process.env.PORT || 4000

app.get('/game/:id', (req, res) => {
    //TODO: Create a new endpoint to get a game score
    res.send()
})

app.post('/game', (req, res) => {
    res.send();
})

app.post('/game/point', (req, res) => {
    res.send();
})

app.listen(port, () => {
    console.log(`Tennis Game listening on port ${port}`)
})
