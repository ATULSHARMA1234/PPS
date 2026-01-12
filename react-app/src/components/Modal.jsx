export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div 
      className="modal"
      aria-hidden={!isOpen}
      onClick={(e) => e.target.classList.contains('modal-overlay') && onClose()}
    >
      <div className="modal-overlay"></div>
      <div className="modal-content" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  )
}
