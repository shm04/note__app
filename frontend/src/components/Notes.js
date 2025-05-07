import React, { useState, useEffect } from "react";
import api from "../api";

function Notes({ onNotesFetched }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/notes")
      .then((response) => {
        onNotesFetched(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [onNotesFetched]);

  return <div>{loading && <p>Loading...</p>}</div>;
}

export default Notes;
