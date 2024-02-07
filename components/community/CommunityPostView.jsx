import React from "react";
import "../../styles/modal_styles.scss";
const CommunityPostView = ({ isOpen, onClose, training }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "blue",
            border: "none",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          Close
        </button>
        <div>
          <article class="prose lg:prose-xl">
            <h1>{training.title}</h1>
            <p>{training.description}</p>
            <div dangerouslySetInnerHTML={{ __html: training.content }} />
          </article>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostView;
