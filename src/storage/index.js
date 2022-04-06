const { MongoClient } = require('mongodb');

module.exports = async ({ config }) => {
    const client = new MongoClient(config.url);
    await client.connect();
    const db = client.db(config.dbName);

    const gameEvents = db.collection(config.collections.gameEvents);

    await gameEvents.createIndex({ id: 1 });

    const getGameEvents = async (id) => gameEvents.find({ id }).toArray();

    const saveGameEvent = async (gameEvent) => gameEvents.insertOne(gameEvent);

    return {
        getGameEvents,
        saveGameEvent,
    };
};
