const { createGame } = require('../factories/gameFactory')();
const { createPlayer } = require('../factories/playerFactory')();
const { createLoveScore, createFifteenScore, createThirtyScore, createFortyScore, createDeuceScore, createAdvantageScore } = require('./scoreService')();
const ScoreNames = require('../constants/ScoreNames');
const { addScoreEvent } = require('./gameService')({gameService: {}, storage: {}});

describe('Game Service Tests', () => {
  const player1Id = 1;
  const player2Id = 2;

  it('should be Fifteen-Love if game is Love-Love and player 1 scores', () => {
    let game = createGame({
      player1: createPlayer({
        id: player1Id,
        score: createLoveScore(),
      }),
      player2: createPlayer({
        id: player2Id,
        score: createLoveScore(),
      }),
    });
    game = addScoreEvent(game)(player1Id);

    expect(game.player1.score.name).toBe(ScoreNames.Fifteen);
    expect(game.player2.score.name).toBe(ScoreNames.Love);
  });

  it('should be Thirty-Love if game is Fifteen-Love and player 1 scores', () => {
    let game = createGame({
      player1: createPlayer({
        id: player1Id,
        score: createFifteenScore(),
      }),
      player2: createPlayer({
        id: player2Id,
        score: createLoveScore(),
      }),
    });
    game = addScoreEvent(game)(player1Id);

    expect(game.player1.score.name).toBe(ScoreNames.Thirty);
    expect(game.player2.score.name).toBe(ScoreNames.Love);
  });

  it('should be Forty-Love if game is Thirty-Love and player 1 scores', () => {
    let game = createGame({
      player1: createPlayer({
        id: player1Id,
        score: createThirtyScore(),
      }),
      player2: createPlayer({
        id: player2Id,
        score: createLoveScore(),
      }),
    });
    game = addScoreEvent(game)(player1Id);

    expect(game.player1.score.name).toBe(ScoreNames.Forty);
    expect(game.player2.score.name).toBe(ScoreNames.Love);
  });

  it('should be Deuce-Deuce if game is Thirty-Forty and player 1 scores', () => {
    let game = createGame({
      player1: createPlayer({
        id: player1Id,
        score: createThirtyScore(),
      }),
      player2: createPlayer({
        id: player2Id,
        score: createFortyScore(),
      }),
    });
    game = addScoreEvent(game)(player1Id);

    expect(game.player1.score.name).toBe(ScoreNames.Deuce);
    expect(game.player2.score.name).toBe(ScoreNames.Deuce);
  });

  it('should win the game if game is Forty-Love and player 1 scores', () => {
    let game = createGame({
      player1: createPlayer({
        id: player1Id,
        score: createFortyScore(),
      }),
      player2: createPlayer({
        id: player2Id,
        score: createLoveScore(),
      }),
    });
    game = addScoreEvent(game)(player1Id);

    expect(game.player1.score.name).toBe(ScoreNames.GameWin);
    expect(game.player2.score.name).toBe(ScoreNames.Love);
  });

  it('should be Advantage-Deuce if game is Deuce-Deuce and player 1 scores', () => {
    let game = createGame({
      player1: createPlayer({
        id: player1Id,
        score: createDeuceScore(),
      }),
      player2: createPlayer({
        id: player2Id,
        score: createDeuceScore(),
      }),
    });
    game = addScoreEvent(game)(player1Id);

    expect(game.player1.score.name).toBe(ScoreNames.Advantage);
    expect(game.player2.score.name).toBe(ScoreNames.Deuce);
  });

  it('should be Deuce-Deuce if game is Advantage-Deuce and player 2 scores', () => {
    let game = createGame({
      player1: createPlayer({
        id: player1Id,
        score: createAdvantageScore(),
      }),
      player2: createPlayer({
        id: player2Id,
        score: createDeuceScore(),
      }),
    });
    game = addScoreEvent(game)(player2Id);

    expect(game.player1.score.name).toBe(ScoreNames.Deuce);
    expect(game.player2.score.name).toBe(ScoreNames.Deuce);
  });

  it('should win the game if game is Advantage-Deuce and player 1 scores', () => {
    let game = createGame({
      player1: createPlayer({
        id: player1Id,
        score: createAdvantageScore(),
      }),
      player2: createPlayer({
        id: player2Id,
        score: createDeuceScore(),
      }),
    });
    game = addScoreEvent(game)(player1Id);

    expect(game.player1.score.name).toBe(ScoreNames.GameWin);
    expect(game.player2.score.name).toBe(ScoreNames.Deuce);
  });
});
