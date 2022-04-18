const system = require('./system')();
system.start();

process.on('SIGTERM', async () => {
    await system.stop();
})

