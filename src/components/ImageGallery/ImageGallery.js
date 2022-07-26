import { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles.css';
// import { Audio } from 'react-loader-spinner';

export class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
    page: 1,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageName !== this.props.imageName) {
      // console.log(this.props.imageName);
      const { imageName } = this.props;
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${imageName}&page=1&key=28317427-cd386f88f666cbda8176ce58f&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`There is no image with that ${imageName}`)
          );
        })
        .then(data => this.setState({ images: data }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleLoadMore = () => {
    const { page } = this.state;
    const { imageName } = this.props;

    this.setState({ loading: true });
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    fetch(
      `https://pixabay.com/api/?q=${imageName}&page=${page}&key=28317427-cd386f88f666cbda8176ce58f&image_type=photo&orientation=horizontal&per_page=12
      }`
    )
      .then(res => res.json())
      .then(response => {
        // console.log(response);
        this.setState(prevState => ({
          images: {
            ...response,
            data: [...prevState.images.hits, ...response.hits],
          },
        }));
      })
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { images, loading, error } = this.state;

    return (
      <>
        {error && <h1>{error.message}</h1>}
        {loading && <h2>Loading...</h2>}
        {/* {this.props.imageName && <div>Enter the name in the search</div>} */}
        <ul className="ImageGallery">
          {images &&
            images.hits.map(({ id, webformatURL, largeImageURL, tags }) => (
              <li
                key={id}
                className="ImageGalleryItem"
                onClick={() =>
                  this.props.handleImageURL({ largeImageURL, tags })
                }
              >
                <img
                  className="ImageGalleryItem-image"
                  src={webformatURL}
                  alt={tags}
                />
              </li>
            ))}
        </ul>
        <button type="button" onClick={this.handleLoadMore} className="Button">
          Load more
          {loading && <span className="Button" />}
        </button>

        {/* <Audio
          height="10"
          width="10"
          radius="9"
          color="blue"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        /> */}
      </>
    );
  }
}

ImageGallery.propTotype = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }),
  handleImageURL: PropTypes.func.isRequired,
};
