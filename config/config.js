const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const extractEnv = (url) => {
  const data = url.split('://')[1];

  const [username, password] = data.split('@')[0].split(':');

  const [host, port] = data.split('@')[1].split('/')[0].split(':');

  const database = data.split('@')[1].split('/')[1];

  return { username, password, host, port, database };
};

const { username, password, host, port, database } = extractEnv(
  process.env.DB_URL,
);

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
  },
  integration: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
  },
  test: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
  },
};
