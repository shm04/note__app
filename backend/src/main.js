const express = require('express');
const cors = require('cors');
const { dataSource } = require('./data-source');
const { AppModule } = require('./app.module');
const { NoteService } = require('./services/note.service');

async function bootstrap() {
  try {
    await dataSource.initialize();
    console.log('DataSource initialized successfully');
  } catch (error) {
    console.error('Error during DataSource initialization:', error);
    process.exit(1);
  }

  const app = express();
  app.use(express.json());

  app.use(
    cors({
      origin: 'http://localhost:3001',
    }),
  );

  const noteService = new NoteService();

  app.get('/notes', async (req, res) => {
    try {
      const notes = await noteService.findAll();
      res.json(notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/notes', async (req, res) => {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res
          .status(400)
          .json({ message: 'Title and content are required' });
      }

      const newNote = await noteService.create({ title, content });
      res.status(201).json(newNote);
    } catch (error) {
      console.error('Error creating note:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.delete('/notes/:id', async (req, res) => {
    try {
      const noteId = req.params.id;
      const result = await noteService.delete(noteId);
      if (result.affected > 0) {
        res.status(200).json({ message: 'Note deleted successfully' });
      } else {
        res.status(404).json({ message: 'Note not found' });
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.put('/notes/:id', async (req, res) => {
    try {
      const noteId = req.params.id;
      const { title, content } = req.body;

      if (!title || !content) {
        return res
          .status(400)
          .json({ message: 'Title and content are required' });
      }

      const updatedNote = await noteService.update(noteId, { title, content });

      if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }

      res.status(200).json(updatedNote);
    } catch (error) {
      console.error('Error updating note:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.put('/notes/:id/archive', async (req, res) => {
    try {
      const noteId = req.params.id;
      const archivedNote = await noteService.archive(noteId);
      res.status(200).json(archivedNote);
    } catch (error) {
      console.error('Error archiving note:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.put('/notes/:id/unarchive', async (req, res) => {
    try {
      const noteId = req.params.id;
      const unarchivedNote = await noteService.unarchive(noteId);
      res.status(200).json(unarchivedNote);
    } catch (error) {
      console.error('Error unarchiving note:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  const appModule = new AppModule();
  appModule.setup(app);

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}

bootstrap();
