import React from "react";
import "./Popup.css";

function NotificationPopup({ message }) {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default NotificationPopup;
