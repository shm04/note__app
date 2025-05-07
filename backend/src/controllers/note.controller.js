const { NoteService } = require('../services/note.service');

class NoteController {
  async findAll(req, res) {
    const noteService = new NoteService();
    const notes = await noteService.findAll();
    res.json(notes);
  }

  async create(req, res) {
    const noteService = new NoteService();
    const note = await noteService.create(req.body);
    res.json(note);
  }
}

module.exports = { NoteController };
