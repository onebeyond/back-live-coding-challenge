window.XMLHttpRequest = false;

const supertest = require('supertest');
const { createNewGameEvent, createGamePointEvent } = require('../src/factories/gameEventFactory')();
const ScoreNames = require('../src/constants/ScoreNames');
const system = require('../system')();

describe('Service Tests', () => {
  let request;
  let collection;
  let mongo;

  beforeAll(async () => {
    const { app, mongodb } = await system.start();
    mongo = mongodb;
    collection = mongodb.gameEvents;
    request = supertest(app);
  });

  beforeEach(async () => {
    await collection.deleteMany();
  });

  afterAll(async () => {
    await system.stop();
  });

    describe('GET /game/:id tests', () => {
        // TODO Add tests for GET /game/:id endpoint
    });

    describe('POST /game tests (should fail if storage.js not implemented)', () => {
        it('should store a newGame event', async () => {
            const gameId = 1;
            const player1Id = 1;
            const player2Id = 2;
            const currentTs = new Date();
            const event = createNewGameEvent({
                id: gameId,
                player1Id,
                player2Id,
                ts: currentTs.toISOString()
            });

            await request
                .post(`/game`)
                .send(event)
                .expect(200);

            const storedEvent = await collection.findOne({ id: gameId }, { projection: { _id: 0 } });

            expect(storedEvent).toStrictEqual(event);
        });
    });

    describe('POST /game/point tests (should fail if storage.js not implemented)', () => {
        it('should store a game Point event', async () => {
            const gameId = 1;
            const playerId = 1;
            const currentTs = new Date();
            const event = createGamePointEvent({
                id: gameId,
                playerId,
                ts: currentTs.toISOString()
            });

            await request
                .post(`/game/point`)
                .send(event)
                .expect(200);

            const storedEvent = await collection.findOne({ id: gameId }, { projection: { _id: 0 } });

            expect(storedEvent).toStrictEqual(event);
        });
    });
});
