module.exports = ({ mongodb }) => {
    const getGameEvents = async (id) => mongodb.gameEvents.find({ id }).sort({ ts: 1 }).toArray();

    const saveGameEvent = async (gameEvent) => mongodb.gameEvents.insertOne(gameEvent);

    return {
        getGameEvents,
        saveGameEvent,
    };
};
