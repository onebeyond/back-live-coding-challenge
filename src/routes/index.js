module.exports = ({ app, gameService }) => {
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
};


