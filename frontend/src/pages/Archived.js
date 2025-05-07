import React, { useState } from "react";
import api from "../api";
import Notes from "../components/Notes";
import "./Home.css";
import NotificationPopup from "../components/NotificationPopup";

function Archived() {
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
    const noteToDelete = notes.find((note) => note.id === noteId);
    setNotes(notes.filter((note) => note.id !== noteId));
    try {
      await api.delete(`/notes/${noteId}`);
      setPopupMessage("Note deleted successfully.");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting note:", error);
      setNotes([...notes, noteToDelete]);
    }
  };

  const handleUnarchive = async (noteId) => {
    try {
      await api.put(`/notes/${noteId}/unarchive`);
      setNotes(
        notes.map((note) =>
          note.id === noteId ? { ...note, is_archived: false } : note
        )
      );
      setPopupMessage("Note delete from archive successfully.");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting note from archive:", error);
    }
  };

  return (
    <div className="home-main">
      <div className="home-header">
        <h2>Archived Notes</h2>
      </div>
      <div className="note-main archived">
        <Notes onNotesFetched={handleNotesFetched} />
        {loading ? (
          <p>Loading...</p>
        ) : notes.length > 0 ? (
          notes.filter((note) => note.is_archived).length > 0 ? (
            notes
              .filter((note) => note.is_archived)
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
                          src={`${process.env.PUBLIC_URL}/images/unarchive.svg`}
                          alt="Unarchive"
                          onClick={() => handleUnarchive(note.id)}
                          className="note-action-icon"
                          title="Unarchive"
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
            <p>No archived notes</p>
          )
        ) : (
          <p>No archived notes</p>
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

export default Archived;
