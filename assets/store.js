export const dbConfig = {
  connectionString: process.env.HEROKU_POSTGRESQL_YELLOW_URL,
  ssl: true,
};