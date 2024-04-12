import React from "react";

function DeleteConfirmation({ confirmDelete, cancelDelete }) {
  return (
    <div className="delete-confirmation">
      <p>Are you sure you want to delete this photo?</p>
      <div>
        <button onClick={confirmDelete}>Yes</button>
        <button onClick={cancelDelete}>No</button>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
