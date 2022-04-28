module.exports = () => {
  const createGame = ({ id, player1, player2 }) => ({
    id,
    player1,
    player2,
  });

  return {
    createGame,
  };
};
