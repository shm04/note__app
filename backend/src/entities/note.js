const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Note',
  tableName: 'notes',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
      generationStrategy: 'increment',
    },
    title: {
      type: 'varchar',
      length: 255,
    },
    content: {
      type: 'text',
    },
    is_archived: {
      type: 'boolean',
      default: false,
    },
    created_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
    updated_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    },
  },
});
