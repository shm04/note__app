import React, { useState, useEffect } from "react";
import api from "../api";
import "./NoteForm.css";
import NotificationPopup from "../components/NotificationPopup";

function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showElements, setShowElements] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState("30px");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/notes", { title, content });
      setTitle("");
      setContent("");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 1500);
    } catch (error) {
      setError("Error adding note.");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e) => {
    setShowElements(true);
    if (e.target.id === "content") {
      setTextareaHeight("70px");
    }
  };

  const handleClickOutside = (e) => {
    if (
      e.target.id !== "content" &&
      e.target.id !== "title" &&
      e.target.className !== "form-btn"
    ) {
      setShowElements(false);
      setTextareaHeight("30px");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit}>
        <img
          src={`${process.env.PUBLIC_URL}/images/delete.png`}
          alt="Delete"
          className={`delete-icon-form ${showElements ? "on" : ""}`}
          title="Delete"
        />
        <div className={`title ${showElements ? "on" : ""}`}>
          <label htmlFor="title"></label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Title"
            onClick={handleClick}
          />
        </div>
        <div className="content">
          <label htmlFor="content"></label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Create a note..."
            onClick={handleClick}
            style={{ height: textareaHeight }}
          />
        </div>
        <button
          className={`form-btn ${showElements ? "on" : ""}`}
          type="submit"
          disabled={loading}
          onClick={handleClick}
        >
          {loading ? "Adding..." : "Add Note"}
        </button>
        {error && <p>{error}</p>}
      </form>
      {showPopup && (
        <NotificationPopup
          message="Note added successfully."
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default NoteForm;
