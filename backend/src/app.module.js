const { Module } = require('@nestjs/common');
const { NoteController } = require('./controllers/note.controller');

class AppModule {
  constructor() {
    this.controllers = [new NoteController()];
  }

  setup(app) {
    this.controllers.forEach((controller) => {
      app.get('/notes', (req, res) => controller.findAll(req, res));
      app.post('/notes', (req, res) => controller.create(req, res));
    });
  }
}

module.exports = { AppModule };
