const { createNewGameEvent, createGamePointEvent } = require('../factories/gameEventFactory')();

const config = require('../../config')();
const mongodbComponent = require('../mongodb');
const storageComponent = require('.');

describe('Storage Tests', () => {
  let mongodb;
  let storage;

  beforeAll(async () => {
    mongodb = await mongodbComponent({ config: config.mongodb });
    storage = storageComponent({ mongodb });
  });

  beforeEach(async () => {
    await mongodb.gameEvents.deleteMany({});
  });

  afterAll(async () => {
    await mongodb.closeConnection();
  });

  describe('getGameEvents', () => {
    it('should return all game events associated to certain id ordered by ts', async () => {
      const gameId = 1;
      const player1Id = 1;
      const player2Id = 2;
      const currentTs = new Date();

      const newGameEvent = createNewGameEvent({
        id: gameId,
        player1Id,
        player2Id,
        ts: currentTs.toISOString(),
      });

      const gamePointEvent1 = createGamePointEvent({
        id: gameId,
        playerId: player1Id,
        ts: new Date(currentTs.getTime() + 2000).toISOString(),
      });

      const gamePointEvent2 = createGamePointEvent({
        id: gameId,
        playerId: player2Id,
        ts: new Date(currentTs.getTime() + 1000).toISOString(),
      });

      await Promise.all([
        mongodb.gameEvents.insertOne(newGameEvent),
        mongodb.gameEvents.insertOne(gamePointEvent1),
        mongodb.gameEvents.insertOne(gamePointEvent2),
      ]);

      const gameEvents = await storage.getGameEvents(gameId);

      expect(gameEvents.length).toBe(3);
      expect(gameEvents[0]).toStrictEqual(newGameEvent);
      expect(gameEvents[1]).toStrictEqual(gamePointEvent2);
      expect(gameEvents[2]).toStrictEqual(gamePointEvent1);
    });

    it('should return an empty list if no game events are stored', async () => {
      const gameId = 1;
      const gameEvents = await storage.getGameEvents(gameId);
      expect(gameEvents.length).toBe(0);
    });
  });

  describe('saveGameEvent', () => {
    // TODO Add tests for saveGameEvent
  });
});
