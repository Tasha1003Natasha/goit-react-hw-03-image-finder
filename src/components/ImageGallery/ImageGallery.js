import { Component } from 'react';
import { toast } from 'react-toastify';
import '../styles.css';

export class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageName !== this.props.imageName) {
      console.log(this.props.imageName);
      const { imageName } = this.props;
      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${imageName}&page=1&key=28317427-cd386f88f666cbda8176ce58f&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(data => this.setState({ images: data }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { images, loading } = this.state;
    const { imageName } = this.props;

    return (
      <>
        {loading && <h1>Loading...</h1>}
        {/* {this.props.imageName && <div>Enter the name in the search</div>} */}
        <ul className="ImageGallery">{imageName}</ul>
        {/* {images && <div>{images.hits[0].id}</div>} */}
        {images && (
          <div>
            {images.hits.map(({ id, webformatURL, largeImageURL }) => (
              <li className="ImageGalleryItem" key={id}>
                <a href={largeImageURL}>
                  <img
                    className="ImageGalleryItem-image"
                    src={webformatURL}
                    alt="/"
                  />
                </a>
              </li>
            ))}
          </div>
        )}
      </>
    );
  }
}
