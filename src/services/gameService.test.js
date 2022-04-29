const { createNewGameEvent, createGamePointEvent } = require('../factories/gameEventFactory')();
const { createGame } = require('../factories/gameFactory')();
const { createPlayer } = require('../factories/playerFactory')();
const ScoreNames = require('../constants/ScoreNames');

const scoreService = require('./scoreService')();

const storageMock = {
  getGameEvents: jest.fn(),
  saveGameEvent: jest.fn(),
};
const { storeGame, storeGamePoint, addScoreEvent } = require('./gameService')({ scoreService, storage: storageMock });

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Game Service', () => {
  describe('addScoreEvent', () => {
    const player1Id = 1;
    const player2Id = 2;

    it('should be Fifteen-Love if game is Love-Love and player 1 scores', () => {
      let game = createGame({
        player1: createPlayer({
          id: player1Id,
          score: scoreService.createLoveScore(),
        }),
        player2: createPlayer({
          id: player2Id,
          score: scoreService.createLoveScore(),
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
          score: scoreService.createFifteenScore(),
        }),
        player2: createPlayer({
          id: player2Id,
          score: scoreService.createLoveScore(),
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
          score: scoreService.createThirtyScore(),
        }),
        player2: createPlayer({
          id: player2Id,
          score: scoreService.createLoveScore(),
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
          score: scoreService.createThirtyScore(),
        }),
        player2: createPlayer({
          id: player2Id,
          score: scoreService.createFortyScore(),
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
          score: scoreService.createFortyScore(),
        }),
        player2: createPlayer({
          id: player2Id,
          score: scoreService.createLoveScore(),
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
          score: scoreService.createDeuceScore(),
        }),
        player2: createPlayer({
          id: player2Id,
          score: scoreService.createDeuceScore(),
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
          score: scoreService.createAdvantageScore(),
        }),
        player2: createPlayer({
          id: player2Id,
          score: scoreService.createDeuceScore(),
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
          score: scoreService.createAdvantageScore(),
        }),
        player2: createPlayer({
          id: player2Id,
          score: scoreService.createDeuceScore(),
        }),
      });
      game = addScoreEvent(game)(player1Id);

      expect(game.player1.score.name).toBe(ScoreNames.GameWin);
      expect(game.player2.score.name).toBe(ScoreNames.Deuce);
    });
  });

  describe('storeGame', () => {
    const gameId = 1;
    const player1Id = 1;
    const player2Id = 2;
    const currentTs = new Date();

    it('should store a new game', async () => {
      const newGameEvent = createNewGameEvent({
        id: gameId, player1Id, player2Id, ts: currentTs,
      });
      await storeGame(newGameEvent);

      expect(storageMock.saveGameEvent.mock.calls[0][0]).toStrictEqual(newGameEvent);
    });
  });

  describe('storeGamePoint', () => {
    const gameId = 1;
    const playerId = 1;
    const currentTs = new Date();

    it('should store a new game', async () => {
      const gamePointEvent = createGamePointEvent({ id: gameId, playerId, ts: currentTs });
      await storeGamePoint(gamePointEvent);

      expect(storageMock.saveGameEvent.mock.calls[0][0]).toStrictEqual(gamePointEvent);
    });
  });
});
