module.exports = ({ app, gameService }) => {
  app.get('/game/:id', async (/* req, res, next */) => {
    // TODO: add logic to get a game
    /*
        TIP: you can delegate the business logic to /src/services/gameService.js.
        There, you have all the needed logic to implement this route
        (with the logic in 'gameService' and 'storage', injected in the component)
     */
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
