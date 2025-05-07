module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'sebastianhm',
  password: 'sehemu',
  database: 'note_challenge',
  entities: ['dist/entities/*.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: true,
  logging: true,
  };
  