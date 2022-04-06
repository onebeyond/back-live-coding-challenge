const routes = require('./src/routes');
const configModule = require('./config');
const gameServiceComponent = require('./src/services/gameService');
const scoreServiceComponent = require('./src/services/scoreService');
const storageComponent = require('./src/storage');

(async () => {
    const config = configModule();
    const storage = await storageComponent({ config });
    const scoreService = scoreServiceComponent({ storage });
    const gameService = gameServiceComponent({ storage, scoreService });
    routes({ gameService });
})();

