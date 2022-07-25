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
      fetch(
        'https://pixabay.com/api/?q={this.props.imageName}&page=1&key=28317427-cd386f88f666cbda8176ce58f&image_type=photo&orientation=horizontal&per_page=12'
          .then(res => res.json())
          .then(console.log)
        //   .then(images => this.setState({ images }))
      );
    }
  }

  render() {
    return (
      <>
        <ul className="ImageGallery">{this.props.imageName}</ul>
        {this.state.images && <div>{this.state.images.hits}</div>}
      </>
    );
  }
}
