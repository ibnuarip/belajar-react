export default function Modal({ isOpen, winner, onReset, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">
          {winner ? `Winner: ${winner}!` : "It's a Draw!"}
        </h2>
        <p className="modal-text">Would you like to play another round?</p>
        <div className="modal-actions">
          <button className="btn-primary" onClick={onReset}>Play Again</button>
          <button className="btn-secondary" onClick={onClose}>Maybe Later</button>
        </div>
      </div>
    </div>
  );
}
