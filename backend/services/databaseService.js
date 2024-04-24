const databaseService = () => {
  const knex = require("knex")({
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB,
    },
  });

  const table = "metrics";

  const createMetric = ({ name, value, timestamp }) => {
    return knex(table).insert({
      name: name,
      value: value,
      timestamp: timestamp,
    });
  };

  const getMetricById = (id) => {
    return knex(table).where({ id: id }).first();
  };

  return {
    createMetric,
    getMetricById,
  };
};

module.exports = {
  databaseService,
};
