module.exports = () => {
  const createScore = (
    name,
    winBall = () => createScore(name, winBall, loseBall),
    loseBall = () => createScore(name, winBall, loseBall),
  ) => ({
    name,
    winBall,
    loseBall,
  });

  return {
    createScore,
  };
};
