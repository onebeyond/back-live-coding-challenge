module.exports = () => ({
  mongodb: {
    url: process.env.MONGO_URL || 'mongodb://localhost/',
    dbName: 'tennis-project',
    collections: {
      gameEvents: 'game_events',
    },
  },
});
