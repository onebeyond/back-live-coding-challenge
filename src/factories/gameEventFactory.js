const GameEventTypes = require('../constants/GameEventTypes');

module.exports = () => {
  const createNewGameEvent = ({
    id, player1Id, player2Id, ts,
  }) => ({
    type: GameEventTypes.NewGame,
    id,
    player1Id,
    player2Id,
    ts,
  });

  const createGamePointEvent = ({ id, playerId, ts }) => ({
    type: GameEventTypes.GamePoint,
    id,
    playerId,
    ts,
  });

  return {
    createNewGameEvent,
    createGamePointEvent,
  };
};
