import {useEffect} from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
const modalRoot = document.querySelector('#modal-root');

export default function Modal ({largeImageUrl, onModalClose}) {
  useEffect(()=> {
    const handleEscKey =e => {
      if (e.code === 'Escape') {
        onModalClose();
      }
    };
    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, );



  function handleOverlayclick (e) {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  };


    return createPortal(
      <div className="Overlay" onClick={handleOverlayclick}>
        <div className="Modal">
          <img src={largeImageUrl} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }

