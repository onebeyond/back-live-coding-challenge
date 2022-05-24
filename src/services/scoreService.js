const ScoreNames = require('../constants/ScoreNames');
const { createScore } = require('../factories/scoreFactory')();

const createLoveScore = () => createScore({ name: ScoreNames.Love, winBall: createFifteenScore });

const createFifteenScore = () => createScore({
  name: ScoreNames.Fifteen,
  winBall: createThirtyScore,
});

const createFortyScore = () => {
  const loseBall = (opponentPlayerScore) => {
    if (opponentPlayerScore === ScoreNames.Deuce) {
      return createDeuceScore();
    }
    return createFortyScore();
  };

  return createScore({ name: ScoreNames.Forty, winBall: createGameWinScore, loseBall });
};

const createGameWinScore = () => createScore({ name: ScoreNames.GameWin });

const createThirtyScore = () => {
  const winBall = (opponentPlayerScore) => {
    if (opponentPlayerScore === ScoreNames.Forty) {
      return createDeuceScore();
    }
    return createFortyScore();
  };
  return createScore({ name: ScoreNames.Thirty, winBall });
};

const createDeuceScore = () => createScore({ name: ScoreNames.Deuce });

const createAdvantageScore = () => {
  const loseBall = (opponentPlayerScore) => {
    if (opponentPlayerScore === ScoreNames.Deuce) {
      return createDeuceScore();
    }
    return createAdvantageScore();
  };
  return createScore({ name: ScoreNames.Advantage, winBall: createGameWinScore, loseBall });
};

module.exports = () => ({
  createLoveScore,
  createFifteenScore,
  createThirtyScore,
  createFortyScore,
  createDeuceScore,
  createAdvantageScore,
  createGameWinScore,
});
