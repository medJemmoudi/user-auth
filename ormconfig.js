const ConnectionOptions = {
  cli: {
    entitiesDir: 'src/main/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  logging: false,
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  synchronize: true,
  type: process.env.DB_DRIVER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [process.cwd() + '/**/*.entity{.ts,.js}'],
};

module.exports = ConnectionOptions;