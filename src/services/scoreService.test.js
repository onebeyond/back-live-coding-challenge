const {
  createLoveScore, createFifteenScore, createThirtyScore, createFortyScore, createDeuceScore, createAdvantageScore,
} = require('./scoreService')();
const ScoreName = require('../constants/ScoreNames');

describe('Score Service Tests', () => {
  describe('Love Score', () => {
    it('should move to Fifteen if win a ball', () => {
      const opponentScore = ScoreName.Love;
      let score = createLoveScore();
      score = score.winBall(opponentScore);
      expect(score.name).toBe(ScoreName.Fifteen);
    });
  });

  describe('Fifteen Score', () => {
    it('should move to Thirty if win a ball', () => {
      const opponentScore = ScoreName.Love;
      let score = createFifteenScore();
      score = score.winBall(opponentScore);
      expect(score.name).toBe(ScoreName.Thirty);
    });
  });

  describe('Thirty Score', () => {
    it('should move to Thirty if win a ball and Opponent score is not Forty', () => {
      const opponentScore = ScoreName.Love;
      let score = createThirtyScore();
      score = score.winBall(opponentScore);
      expect(score.name).toBe(ScoreName.Forty);
    });

    it('should move to Deuce if win a ball and Opponent score is Forty', () => {
      const opponentScore = ScoreName.Forty;
      let score = createThirtyScore();
      score = score.winBall(opponentScore);
      expect(score.name).toBe(ScoreName.Deuce);
    });
  });

  describe('Forty Score', () => {
    it('should move to GameWin if win a ball', () => {
      const opponentScore = ScoreName.Love;
      let score = createFortyScore();
      score = score.winBall(opponentScore);
      expect(score.name).toBe(ScoreName.GameWin);
    });

    it('should move to Deuce if lose a ball and Opponent score is Deuce', () => {
      const opponentScore = ScoreName.Deuce;
      let score = createFortyScore();
      score = score.loseBall(opponentScore);
      expect(score.name).toBe(ScoreName.Deuce);
    });
  });

  describe('Deuce Score', () => {
    it('should move to Advantage if win a ball', () => {
      const opponentScore = ScoreName.Deuce;
      let score = createDeuceScore();
      score = score.winBall(opponentScore);
      expect(score.name).toBe(ScoreName.Advantage);
    });
  });

  describe('Forty Score', () => {
    it('should move to GameWin if win a ball', () => {
      const opponentScore = ScoreName.Love;
      let score = createAdvantageScore();
      score = score.winBall(opponentScore);
      expect(score.name).toBe(ScoreName.GameWin);
    });

    it('should move to Deuce if lose a ball and Opponent score is Deuce', () => {
      const opponentScore = ScoreName.Deuce;
      let score = createAdvantageScore();
      score = score.loseBall(opponentScore);
      expect(score.name).toBe(ScoreName.Deuce);
    });
  });
});
