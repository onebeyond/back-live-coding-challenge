const ScoreNames = require('../constants/ScoreNames');
const { createScore } = require('../factories/scoreFactory')();


const createLoveScore = () => createScore(ScoreNames.Love, createFifteenScore);

const createFifteenScore = () => createScore(ScoreNames.Fifteen, createThirtyScore);

const createFortyScore = () => {
    const loseBall = (opponentPlayerScore) => {
        if (opponentPlayerScore === ScoreNames.Deuce) {
            return createDeuceScore();
        }
        return createFortyScore();
    }

    return createScore(ScoreNames.Forty, createGameWinScore, loseBall);
};

const createGameWinScore = () => createScore(ScoreNames.GameWin);

const createThirtyScore = () => {
    const winBall = (opponentPlayerScore) => {
        if (opponentPlayerScore === ScoreNames.Forty) {
            return createDeuceScore();
        }
        return createFortyScore();
    };
    return createScore(ScoreNames.Thirty, winBall);
};

const createDeuceScore = () => {
    const winBall = (opponentPlayerScore) => {
        if (opponentPlayerScore === ScoreNames.Advantage) {
            return createDeuceScore();
        }
        return createAdvantageScore();
    };
    return createScore(ScoreNames.Deuce, winBall);
};

const createAdvantageScore = () => {
    const loseBall = (opponentPlayerScore) => {
        if (opponentPlayerScore === ScoreNames.Deuce) {
            return createDeuceScore();
        }
        return createAdvantageScore();
    };
    return createScore(ScoreNames.Advantage, createGameWinScore, loseBall);
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
