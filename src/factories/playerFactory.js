module.exports = () => {
  const createPlayer = ({ id, score }) => ({
    id,
    score,
  });

  return {
    createPlayer,
  };
};
