const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

module.exports = ({ gameService }) => {
    const port = process.env.PORT || 4000;
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(cors());

    app.get('/game/:id', async (req, res) => {
        const {params: { id }} = req;
        const game = await gameService.getGame(Number(id));
        res.send(game);
    });

    app.post('/game', async (req, res) => {
        const { body } = req;
        await gameService.storeGame(body);
        res.send(body);
    });

    app.post('/game/point', async (req, res) => {
        const { body } = req;
        await gameService.storeGamePoint(body);
        res.send();
    });

    app.listen(port, () => {
        console.log(`Tennis Game listening on port ${port}`)
    });
};


