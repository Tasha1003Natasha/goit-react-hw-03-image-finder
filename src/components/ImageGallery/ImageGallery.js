import { Component } from 'react';
import '../styles.css';

export class ImageGallery extends Component {
  state = {
    images: null,
  };

  componentDidUpdate(prevProps, prevState) {
    // const prevName = prevProps.imageName;
    // const nextName = this.props.imageName;
    if (prevProps.imageName !== this.props.imageName) {
      console.log(this.props.imageName);
      const { imageName } = this.props;
      fetch(
        `https://pixabay.com/api/?q=${imageName}&page=1&key=28317427-cd386f88f666cbda8176ce58f&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(data => this.setState({ images: data }));
    }
  }

  render() {
    return (
      <>
        <ul className="ImageGallery">{this.props.imageName}</ul>
        {this.state.images && <div>{this.state.images.hits[0].id}</div>}
      </>
    );
  }
}
