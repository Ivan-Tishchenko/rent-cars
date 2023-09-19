import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './Modal.module.css';

function Modal({ children, toggleModal }) {
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        toggleModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleModal]);

  return createPortal(
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button
          type="button"
          className={styles.exitButton}
          onClick={toggleModal}
        >
          <AiOutlineClose className={styles.exitEmage} />
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.querySelector('#modal-root')
  );
}

export default Modal;
