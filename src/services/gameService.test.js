const { createNewGameEvent, createGamePointEvent } = require('../factories/gameEventFactory')();
const { createGame } = require('../factories/gameFactory')();
const { createPlayer } = require('../factories/playerFactory')();
const { createScore } = require('../factories/scoreFactory')();

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
    const gameId = 1;
    const player1Id = 1;
    const player2Id = 2;

    const createMockScore = (name) => {
      const winBall = jest.fn();
      const loseBall = jest.fn();
      return createScore({
        name,
        winBall: winBall.mockReturnValue(createScore({ name, winBall, loseBall })),
        loseBall: loseBall.mockReturnValue(createScore({ name, winBall, loseBall })),
      });
    };

    it('should apply "winBall" event to player1 if player1 scores', () => {
      let game = createGame({
        id: gameId,
        player1: createPlayer({
          id: player1Id,
          score: createMockScore('player1Score'),
        }),
        player2: createPlayer({
          id: player2Id,
          score: createMockScore('player3Score'),
        }),
      });
      game = addScoreEvent(game)(player1Id);

      expect(game.player1.score.winBall).toHaveBeenCalledTimes(1);
      expect(game.player1.score.loseBall).toHaveBeenCalledTimes(0);
    });

    it('should apply "looseBall" event to player2 if player1 scores', () => {
      let game = createGame({
        player1: createPlayer({
          id: player1Id,
          score: createMockScore('player1Score'),
        }),
        player2: createPlayer({
          id: player2Id,
          score: createMockScore('player2Score'),
        }),
      });
      game = addScoreEvent(game)(player1Id);

      expect(game.player2.score.loseBall).toHaveBeenCalledTimes(1);
      expect(game.player2.score.winBall).toHaveBeenCalledTimes(0);
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
