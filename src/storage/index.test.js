
const { createNewGameEvent, createGamePointEvent, GameEvents } = require('../factories/gameEventFactory')();

const config = require('../../config')();
const mongodbComponent = require('../mongodb');
const storageComponent = require('./');

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

    describe('getGameEvents', () => {
        it('should return all game events associated to certain id', async () => {
            const gameId = 1;
            const player1Id = 1;
            const player2Id = 2;

            const newGameEvent = createNewGameEvent({
                id: gameId,
                player1Id,
                player2Id,
                ts: new Date().toISOString(),
            });

            const gamePointEvent = createGamePointEvent({
                id: gameId,
                playerId: player1Id,
                ts: new Date().toISOString(),
            });

            await Promise.all([
                 mongodb.gameEvents.insertOne(newGameEvent),
                 mongodb.gameEvents.insertOne(gamePointEvent),
            ])


            const gameEvents = await storage.getGameEvents(gameId);

            expect(gameEvents.length).toBe(2);
            expect(gameEvents.find(event => event.type === GameEvents.NewGame)).toStrictEqual(newGameEvent);
            expect(gameEvents.find(event => event.type === GameEvents.GamePoint)).toStrictEqual(gamePointEvent);
        });

        it('should return an empty list if no game events are stored', async () => {
            const gameId = 1;
            const gameEvents = await storage.getGameEvents(gameId);
            expect(gameEvents.length).toBe(0);
        });
    });

    describe('saveGameEvent', () => {
        it('should store an event', async () => {
            const gameId = 1;
            const player1Id = 1;
            const player2Id = 2;

            const gameEvent = createNewGameEvent({
                id: gameId,
                player1Id,
                player2Id,
                ts: new Date().toISOString(),
            });


            await storage.saveGameEvent(gameEvent);

            const gameEvents = await mongodb.gameEvents.find({ id: gameId });

            expect(gameEvents.length).toBe(1);
            expect(gameEvents[0]).toStrictEqual(gameEvent);
        });
    });
});
