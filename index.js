const routes = require('./src/routes');
const configModule = require('./config');
const gameServiceComponent = require('./src/services/gameService');
const scoreServiceComponent = require('./src/services/scoreService');
const storageComponent = require('./src/storage');
const mongoDBComponent = require('./src/mongodb');

(async () => {
    const config = configModule();
    const mongodb = await mongoDBComponent({ config: config.mongodb });
    const storage = storageComponent({ mongodb });
    const scoreService = scoreServiceComponent({ storage });
    const gameService = gameServiceComponent({ storage, scoreService });
    routes({ gameService });
})();

