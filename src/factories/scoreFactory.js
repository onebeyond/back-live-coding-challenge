module.exports = () => {
  const createScore = ({ name, winBall, loseBall }) => {
    const defaultFn = () => createScore({ name, winBall, loseBall });
    return {
      name,
      winBall: winBall || defaultFn,
      loseBall: loseBall || defaultFn,
    };
  };

  return {
    createScore,
  };
};
