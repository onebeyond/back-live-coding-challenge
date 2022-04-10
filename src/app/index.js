const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

module.exports = () => {
    const port = process.env.PORT || 4000;
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(cors());

    app.listen(port, () => {
        console.log(`Tennis Game listening on port ${port}`)
    });

    return app;
}


