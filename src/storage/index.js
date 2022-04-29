module.exports = ({ mongodb }) => {
  const getGameEvents = async (id) => mongodb.gameEvents.find({ id }).sort({ ts: 1 }).toArray();

  const saveGameEvent = async (/* gameEvent */) => {
    // TODO: add logic to store a game event
  };

  return {
    getGameEvents,
    saveGameEvent,
  };
};
