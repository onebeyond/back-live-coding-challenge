const supertest = require('supertest');
const { createNewGameEvent, createGamePointEvent } = require('../src/factories/gameEventFactory')();
const ScoreNames = require('../src/constants/ScoreNames');
const system = require('../system');

window.XMLHttpRequest = false;

describe('Service Tests', () => {
    let request;
    let collection;

    beforeAll(async () => {
        const { app, mongodb } = await system();
        collection = mongodb.gameEvents;
        request = supertest(app);
    });

    beforeEach(async () => {
        await collection.deleteMany();
    });

    describe('GET /game/:id tests', () => {
        it('should return a game', async () => {
            const gameId = 1;
            const player1Id = 1;
            const player2Id = 2;
            const currentTs = new Date();

            collection.insertMany([
                createNewGameEvent({ id: gameId, player1Id, player2Id, ts: currentTs }),
                createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 1000) }),
                createGamePointEvent({ id: gameId, playerId: player1Id, ts: new Date(currentTs.getTime() + 2000) }),
            ]);

            const response = await request
                .get(`/game/${gameId}`)
                .expect(200);

            expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
            expect(response.body).toStrictEqual({
                id: 1,
                player1: {
                    id: 1,
                    score: {
                        name: ScoreNames.Thirty,
                    }
                },
                player2: {
                    id: 2,
                    score: {
                        name: ScoreNames.Love,
                    }
                }
            });
        });

        it('should return a 404 if game with id does not exists', () => request
            .get('/game/1')
            .expect(404));
    });

    describe('POST /game tests', () => {
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

    describe('POST /game/point tests', () => {
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
