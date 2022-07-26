import { Component } from 'react';
import { toast } from 'react-toastify';
import '../styles.css';

export class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
    page: 1,
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

  handleLoadMore = () => {
    const { images, page } = this.state;
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
        console.log(response);
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
    const { images, loading } = this.state;
    const { imageName } = this.props;

    return (
      <>
        {loading && <h1>Loading...</h1>}
        {/* {this.props.imageName && <div>Enter the name in the search</div>} */}
        <ul className="ImageGallery">{imageName}</ul>
        {images && (
          <div>
            {images.hits.map(({ id, webformatURL, largeImageURL, tags }) => (
              <li
                className="ImageGalleryItem"
                onClick={() =>
                  this.props.handleImageURL({ largeImageURL, tags })
                }
                key={id}
              >
                {largeImageURL}
                <img
                  className="ImageGalleryItem-image"
                  src={webformatURL}
                  alt={tags}
                />
              </li>
            ))}
            <button
              type="button"
              onClick={this.handleLoadMore}
              className={('Button', loading ? 'disabled' : '')}
            >
              Load more
              {loading && <span className="Button" />}
            </button>
          </div>
        )}
      </>
    );
  }
}
