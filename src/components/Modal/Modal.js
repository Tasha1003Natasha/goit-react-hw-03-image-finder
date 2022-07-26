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

    return createPortal(
      <>
        <button type="button" onClick={handleModal}>
          Open modal
        </button>
        <div className="Overlay" onClick={handleModal}>
          <div className="Modal">
            <img
              className="ImageGalleryItem-large"
              src={largeImageURL}
              alt={tags}
            />
            {/* <button type="button" onClick={handleModal}>
              X
            </button> */}
          </div>
        </div>
      </>,
      document.body
    );
  }
}
