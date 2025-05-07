import React, { useState } from "react";
import Notes from "../components/Notes";
import "./Home.css";
import api from "../api";
import NoteForm from "../components/NoteForm";
import NotificationPopup from "../components/NotificationPopup";

function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [hoveredNoteId, setHoveredNoteId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleNotesFetched = (fetchedNotes) => {
    setNotes(fetchedNotes);
    setLoading(false);
  };

  const handleEdit = (noteId, currentTitle, currentContent) => {
    setEditingNoteId(noteId);
    setEditedTitle(currentTitle);
    setEditedContent(currentContent);
  };

  const handleSaveEdit = async (noteId) => {
    try {
      await api.put(`/notes/${noteId}`, {
        title: editedTitle,
        content: editedContent,
      });
      setNotes(
        notes.map((note) =>
          note.id === noteId
            ? { ...note, title: editedTitle, content: editedContent }
            : note
        )
      );
      setEditingNoteId(null);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      await api.delete(`/notes/${noteId}`);
      setNotes(notes.filter((note) => note.id !== noteId));
      setPopupMessage("Note deleted successfully.");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleArchive = async (noteId) => {
    try {
      await api.put(`/notes/${noteId}/archive`);
      setNotes(
        notes.map((note) =>
          note.id === noteId ? { ...note, is_archived: true } : note
        )
      );
      setPopupMessage("Note archived successfully.");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } catch (error) {
      console.error("Error archiving note:", error);
    }
  };

  const sortedNotes = notes.sort((a, b) => a.id - b.id);

  return (
    <div className="home-main">
      <div className="home-header">
        <h2>My Notes</h2>
      </div>
      <NoteForm />
      <div className="note-main">
        <Notes onNotesFetched={handleNotesFetched} />
        {loading ? (
          <p>Loading...</p>
        ) : sortedNotes.length > 0 ? (
          sortedNotes
            .filter((note) => !note.is_archived)
            .map((note, index) => (
              <div
                key={index}
                className="note"
                onMouseEnter={() => setHoveredNoteId(note.id)}
                onMouseLeave={() => setHoveredNoteId(null)}
              >
                {editingNoteId === note.id ? (
                  <div className="note-sub">
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <button onClick={() => handleSaveEdit(note.id)}>
                      Save
                    </button>
                    <button onClick={() => setEditingNoteId(null)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="note-sub">
                    <h2>{note.title}</h2>
                    <span className="underline"></span>
                    <p>{note.content}</p>
                    <div
                      className={`note-actions ${
                        hoveredNoteId === note.id ? "visible" : "hidden"
                      }`}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/archive.png`}
                        alt="Archive"
                        onClick={() => handleArchive(note.id)}
                        className="note-action-icon"
                        title="Archive"
                      />
                      <img
                        src={`${process.env.PUBLIC_URL}/images/edit.png`}
                        alt="Edit"
                        onClick={() =>
                          handleEdit(note.id, note.title, note.content)
                        }
                        className="note-action-icon"
                        title="Edit"
                      />
                    </div>
                    <div
                      className={`note-actions-del ${
                        hoveredNoteId === note.id ? "visible" : "hidden"
                      }`}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/delete.png`}
                        alt="Delete"
                        onClick={() => handleDelete(note.id)}
                        className="delete-icon"
                        title="Delete"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))
        ) : (
          <p>No notes found</p>
        )}
      </div>
      {showPopup && (
        <NotificationPopup
          message={popupMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default Home;
