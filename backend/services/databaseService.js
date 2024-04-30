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
  const logTable = "metric_insert_log";

  const createMetric = async ({ name, value, timestamp }) => {
    try {
      const [metricId] = await knex(table).insert({
        name: name,
        value: value,
        timestamp: timestamp,
      });

      await knex(logTable).insert({
        metric_id: metricId,
        name: name,
        value: value,
        timestamp: timestamp,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getAllMetrics = () => {
    return knex(table).select();
  };

  const getMetricById = (id) => {
    return knex(table).where({ id }).first();
  };

  const getRecentInsertions = async (lastCheckTimestamp) => {
    try {
      const recentInsertions = await knex(logTable)
        .select()
        .where("timestamp", ">", lastCheckTimestamp)
        .first();

      return recentInsertions;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    createMetric,
    getAllMetrics,
    getMetricById,
    getRecentInsertions,
  };
};

module.exports = {
  databaseService,
};
