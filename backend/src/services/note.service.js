const { dataSource } = require('../data-source');
const Note = require('../entities/note');

class NoteService {
  constructor() {
    this.noteRepository = dataSource.getRepository(Note);
  }

  async findAll() {
    const noteRepository = dataSource.getRepository(Note);
    return await noteRepository.find({
      order: { created_at: 'ASC' },
    });
  }

  async create(noteData) {
    const note = this.noteRepository.create(noteData);
    return await this.noteRepository.save(note);
  }

  async delete(noteId) {
    return await this.noteRepository.delete(noteId);
  }

  async update(noteId, noteData) {
    const noteRepository = dataSource.getRepository(Note);
    const note = await noteRepository.findOneBy({ id: noteId });

    if (!note) {
      return null;
    }

    noteRepository.merge(note, noteData);
    return await noteRepository.save(note);
  }

  async archive(noteId) {
    const noteRepository = dataSource.getRepository(Note);
    const note = await noteRepository.findOneBy({ id: noteId });
    if (note) {
      note.is_archived = true;
      return await noteRepository.save(note);
    }
    throw new Error('Note not found');
  }

  async unarchive(noteId) {
    const noteRepository = dataSource.getRepository(Note);
    const note = await noteRepository.findOneBy({ id: noteId });
    if (note) {
      note.is_archived = false;
      return await noteRepository.save(note);
    }
    throw new Error('Note not found');
  }
}

module.exports = { NoteService };
