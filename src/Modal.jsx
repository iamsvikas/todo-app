import "./Modal.css"; // Import CSS for styling

const Modal = ({ confirm, onDelete, onCancel }) => {
  return (
    <>
      {confirm && (
        <div className="modal-overlay" onClick={onCancel}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h6>Are You sure you want to delete it?</h6>
            <div className="button-container">
              <button onClick={onCancel}>Cancel</button>
              <button onClick={onDelete}>Delete It</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
