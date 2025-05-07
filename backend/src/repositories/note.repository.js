const { Repository } = require('typeorm');
const { Note } = require('../entities/note');

class NoteRepository extends Repository {
  constructor(dataSource) {
    super(Note, dataSource.manager);
    this.noteRepository = dataSource.getRepository(Note);
  }

  async deleteNoteById(noteId) {
    return await this.noteRepository.delete(noteId);
  }
}

module.exports = { NoteRepository };
