const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

const { MongoClient } = require('mongodb');

module.exports = async ({ config }) => {
    const client = new MongoClient(config.url);
    await client.connect();
    const db = client.db(config.dbName);
    const gameEvents = db.collection(config.collections.gameEvents);

    return {
        gameEvents,
    }
};
