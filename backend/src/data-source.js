const { DataSource } = require('typeorm');
const NoteEntity = require('./entities/note');

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'sebastianhm',
  password: 'sehemu',
  database: 'note_challenge',
  entities: [NoteEntity],
  migrations: ['./src/migrations/*.js'],
  synchronize: false,
});

module.exports = { dataSource };
