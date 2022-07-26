import { Component } from 'react';
// import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import '../styles.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModal);
  }

  handleCloseModal = event => {
    if (event.code === 'Escape') {
      this.props.handleModal();
    }
  };

  render() {
    const { handleModal, largeImageURL, tags } = this.props;

    return (
      <>
        <button type="button" onClick={handleModal}>
          Open modal
        </button>
        <div className="Overlay">
          <div className="Modal">
            <img
              className="ImageGalleryItem-image"
              src={largeImageURL}
              alt={tags}
            />
            <button type="button" onClick={handleModal}>
              X
            </button>
          </div>
        </div>
      </>
    );
  }
}
