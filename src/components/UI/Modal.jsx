// Modal.jsx
// Dialog that renders its `children` (composition pattern) inside an overlay.
// Closes on the × button, a backdrop click, or the Escape key.

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './UI.module.css';

const Modal = ({ children, onClose, title = '' }) => {
  // Side effect: listen for Escape while mounted, and clean up on unmount.
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Close only when the click lands on the backdrop, not the modal body.
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <div className={styles.modalHeader}>
          {/* Conditional rendering (&&): only render a title when provided. */}
          {title && <h3 className={styles.modalTitle}>{title}</h3>}
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;
