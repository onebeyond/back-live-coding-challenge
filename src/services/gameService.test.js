const { createNewGameEvent, createGamePointEvent } = require('../factories/gameEventFactory')();
const ScoreNames = require('../constants/ScoreNames');

const scoreService = require('./scoreService')();
const storageMock = {
  getGameEvents: jest.fn(),
  saveGameEvent: jest.fn(),
};
const { getGame, storeGame, storeGamePoint } = require('./gameService')({ scoreService, storage: storageMock });

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Game Service', () => {
  describe('getGame', () => {
    const gameId = 1;
    const player1Id = 1;
    const player2Id = 2;
    const currentTs = new Date();

    it('should be Fifteen-Love if game is Love-Love and player 1 scores', async () => {
      storageMock.getGameEvents.mockReturnValueOnce([
        createNewGameEvent({ id: gameId, player1Id, player2Id, ts: currentTs }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 1000) }),
      ]);

      const game = await getGame(gameId);

      expect(game.player1.score.name).toBe(ScoreNames.Fifteen);
      expect(game.player2.score.name).toBe(ScoreNames.Love);
    });

    it('should be Thirty-Love if game is Fifteen-Love and player 1 scores', async () => {
      storageMock.getGameEvents.mockReturnValueOnce([
        createNewGameEvent({ id: gameId, player1Id, player2Id, ts: currentTs }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 1000) }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 2000) }),
      ]);

      const game = await getGame(gameId);

      expect(game.player1.score.name).toBe(ScoreNames.Thirty);
      expect(game.player2.score.name).toBe(ScoreNames.Love);
    });

    it('should be Forty-Love if game is Thirty-Love and player 1 scores', async () => {
      storageMock.getGameEvents.mockReturnValueOnce([
        createNewGameEvent({ id: gameId, player1Id, player2Id, ts: currentTs }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 1000) }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 2000) }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 3000) }),
      ]);

      const game = await getGame(gameId);

      expect(game.player1.score.name).toBe(ScoreNames.Forty);
      expect(game.player2.score.name).toBe(ScoreNames.Love);
    });

    it('should be Deuce-Deuce if game is Thirty-Forty and player 1 scores', async () => {
      storageMock.getGameEvents.mockReturnValueOnce([
        createNewGameEvent({ id: gameId, player1Id, player2Id, ts: currentTs }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 1000) }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 2000) }),
        createGamePointEvent({ id: gameId, playerId: player2Id, ts: new Date(currentTs.getTime() + 3000) }),
        createGamePointEvent({ id: gameId, playerId: player2Id, ts: new Date(currentTs.getTime() + 5000) }),
        createGamePointEvent({ id: gameId, playerId: player2Id, ts: new Date(currentTs.getTime() + 6000) }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 7000) }),
      ]);

      const game = await getGame(gameId);

      expect(game.player1.score.name).toBe(ScoreNames.Deuce);
      expect(game.player2.score.name).toBe(ScoreNames.Deuce);
    });

    it('should win the game if game is Forty-Love and player 1 scores', async () => {
      storageMock.getGameEvents.mockReturnValueOnce([
        createNewGameEvent({ id: gameId, player1Id, player2Id, ts: currentTs }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 1000) }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 2000) }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 3000) }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 4000) }),
      ]);

      const game = await getGame(gameId);

      expect(game.player1.score.name).toBe(ScoreNames.GameWin);
      expect(game.player2.score.name).toBe(ScoreNames.Love);
    });

    it('should be Advantage-Deuce if game is Deuce-Deuce and player 1 scores', async () => {
      storageMock.getGameEvents.mockReturnValueOnce([
        createNewGameEvent({ id: gameId, player1Id, player2Id, ts: currentTs }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 1000) }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 2000) }),
        createGamePointEvent({ id: gameId, playerId: player2Id, ts: new Date(currentTs.getTime() + 3000) }),
        createGamePointEvent({ id: gameId, playerId: player2Id, ts: new Date(currentTs.getTime() + 4000) }),
        createGamePointEvent({ id: gameId, playerId: player2Id, ts: new Date(currentTs.getTime() + 5000) }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 6000) }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 7000) }),
      ]);

      const game = await getGame(gameId);

      expect(game.player1.score.name).toBe(ScoreNames.Advantage);
      expect(game.player2.score.name).toBe(ScoreNames.Deuce);
    });

    it('should be Deuce-Deuce if game is Advantage-Deuce and player 2 scores', async () => {
      storageMock.getGameEvents.mockReturnValueOnce([
        createNewGameEvent({ id: gameId, player1Id, player2Id, ts: currentTs }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 1000) }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 2000) }),
        createGamePointEvent({ id: gameId, playerId: player2Id, ts: new Date(currentTs.getTime() + 3000) }),
        createGamePointEvent({ id: gameId, playerId: player2Id, ts: new Date(currentTs.getTime() + 4000) }),
        createGamePointEvent({ id: gameId, playerId: player2Id, ts: new Date(currentTs.getTime() + 5000) }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 6000) }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 7000) }),
        createGamePointEvent({ id: gameId, playerId: player2Id, ts: new Date(currentTs.getTime() + 8000) }),
      ]);

      const game = await getGame(gameId);

      expect(game.player1.score.name).toBe(ScoreNames.Deuce);
      expect(game.player2.score.name).toBe(ScoreNames.Deuce);
    });

    it('should win the game if game is Advantage-Deuce and player 1 scores', async () => {
      storageMock.getGameEvents.mockReturnValueOnce([
        createNewGameEvent({ id: gameId, player1Id, player2Id, ts: currentTs }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 1000) }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 2000) }),
        createGamePointEvent({ id: gameId, playerId: player2Id, ts: new Date(currentTs.getTime() + 3000) }),
        createGamePointEvent({ id: gameId, playerId: player2Id, ts: new Date(currentTs.getTime() + 4000) }),
        createGamePointEvent({ id: gameId, playerId: player2Id, ts: new Date(currentTs.getTime() + 5000) }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 6000) }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 7000) }),
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 8000) }),
      ]);

      const game = await getGame(gameId);

      expect(game.player1.score.name).toBe(ScoreNames.GameWin);
      expect(game.player2.score.name).toBe(ScoreNames.Deuce);
    });

    it('should throw an error if no newGame event is stored', async () => {
      storageMock.getGameEvents.mockReturnValueOnce([
        createGamePointEvent({ id: gameId, playerId: player1Id, ts: currentTs }),
      ]);
      await expect(getGame(gameId)).rejects.toThrowError(`Game with id ${gameId} not found`);
    });
  });

  describe('storeGame', () => {
    const gameId = 1;
    const player1Id = 1;
    const player2Id = 2;
    const currentTs = new Date();

    it('should store a new game', async () => {
      const newGameEvent = createNewGameEvent({ id: gameId, player1Id, player2Id, ts: currentTs });
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


