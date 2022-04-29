const { NotFoundError } = require('../errors');

module.exports = ({ app, gameService }) => {
  app.get('/game/:id', async (req, res, next) => {
    try {
      const { params: { id } } = req;
      const game = await gameService.getGame(Number(id));
      return res.send(game);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).send(error.message);
      }
      return next(error);
    }
  });

  app.post('/game', async (req, res, next) => {
    try {
      const { body } = req;
      await gameService.storeGame(body);
      return res.send();
    } catch (error) {
      return next(error);
    }
  });

  app.post('/game/point', async (req, res, next) => {
    try {
      const { body } = req;
      await gameService.storeGamePoint(body);
      return res.send();
    } catch (error) {
      return next(error);
    }
  });
};
