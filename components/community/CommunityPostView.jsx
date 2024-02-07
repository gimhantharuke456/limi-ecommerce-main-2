import React from "react";
import "../../styles/modal_styles.scss";
const CommunityPostView = ({ isOpen, onClose, training }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
        <div>
          <h2>{training.title}</h2>
          <p>{training.description}</p>
          {/* Additional details about the training */}
        </div>
      </div>
    </div>
  );
};

export default CommunityPostView;
