import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  
    componentDidMount() {
      window.addEventListener('keydown', this.handleKeyDown);
    }
  
    componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  
    handleClickBackdrop = e => {
      if (e.target === e.currentTarget) {
        this.props.onClose();
      }
    };
  
    handleKeyDown = e => {
      if (e.code === 'Escape') {
        this.props.onClose();
      }
    };
  
    render() {
      const { currentImageUrl, currentImageDescription } =
        this.props;
  
      return createPortal(
        <div className={css.Backdrop} onClick={this.handleClickBackdrop}>
          <div className={css.Modal}>
            <img
              src={currentImageUrl}
              alt={currentImageDescription}
            />
          </div>
        </div>,
        modalRoot
      );
    }
  }
  
  export default Modal;