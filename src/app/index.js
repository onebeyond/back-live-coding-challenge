const { join } = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load(join(__dirname, '../../docs/swagger/swagger.yml'));

module.exports = () => {
  const port = process.env.PORT || 4000;
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(helmet());
  app.use(cors());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  const server = app.listen(port, () => {
    console.log(`Tennis Game listening on port ${port}`);
  });

  return {
    app,
    server,
  };
};
