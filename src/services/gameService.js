const { createPlayer } = require('../factories/playerFactory')();
const { createGame } = require('../factories/gameFactory')();
const { createNewGameEvent, createGamePointEvent } = require('../factories/gameEventFactory')();

module.exports = ({ storage, scoreService }) => {
  const handlePlayerScored = (player, playerId, opponentScore) => (player.id === playerId
    ? createPlayer({
      ...player,
      score: player.score.winBall(opponentScore),
    }) : createPlayer(player));

  const handleOpponentPlayerScored = (player, playerId, opponentScore) => (player.id !== playerId
    ? createPlayer({
      ...player,
      score: player.score.loseBall(opponentScore),
    }) : createPlayer(player));

  const updateWinnerPointPlayer = (_game, playerId) => createGame({
    ..._game,
    player1: handlePlayerScored(_game.player1, playerId, _game.player2.score.name),
    player2: handlePlayerScored(_game.player2, playerId, _game.player1.score.name),
  });

  const updateLoserPointPlayer = (_game, playerId) => createGame({
    ..._game,
    player1: handleOpponentPlayerScored(_game.player1, playerId, _game.player2.score.name),
    player2: handleOpponentPlayerScored(_game.player2, playerId, _game.player1.score.name),
  });

  const addScoreEvent = (_game) => (playerId) => {
    let game = { ..._game };
    game = updateWinnerPointPlayer(game, playerId);
    game = updateLoserPointPlayer(game, playerId);
    return game;
  };

  const getInitialGameState = (id, player1Id, player2Id) => createGame({
    id,
    player1: createPlayer({
      id: player1Id,
      score: scoreService.createLoveScore(),
    }),
    player2: createPlayer({
      id: player2Id,
      score: scoreService.createLoveScore(),
    }),
  });

  const storeGame = async (args) => storage.saveGameEvent(createNewGameEvent(args));

  const storeGamePoint = async (args) => storage.saveGameEvent(createGamePointEvent(args));

  // TODO: handle new route business logic here
  /*
    const getGame = async (id) => {
      ...
    };
   */

  return {
    storeGame,
    storeGamePoint,
    addScoreEvent,
    getInitialGameState,
  };
};
