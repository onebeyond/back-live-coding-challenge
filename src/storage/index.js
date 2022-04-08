module.exports = ({ mongodb }) => {
    const getGameEvents = async (id) => mongodb.gameEvents.find({ id }).toArray();

    const saveGameEvent = async (gameEvent) => mongodb.gameEvents.insertOne(gameEvent);

    return {
        getGameEvents,
        saveGameEvent,
    };
};
