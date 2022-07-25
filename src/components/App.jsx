import { Component } from 'react';
// import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from '../components/Searchbar/Searchbar';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import axios from 'axios';

// axios.defaults.baseURL =
//   'https://pixabay.com/api/?28317427-cd386f88f666cbda8176ce58f/image_type=photo';

// const ImageGallery = ({ images }) => (
//   <ul className="gallery">
//     {images.map(({ id, webformatURL, largeImageURL }) => (
//       <li className="gallery-item" key={id}>
//         <a href={largeImageURL}>
//           <img src={webformatURL} alt="/" />
//         </a>
//       </li>
//     ))}
//   </ul>
// );

// export class App extends Component {
//   state = {
//     images: [],
//   };

//   async componentDidMount() {
//     const response = await axios.get('/search?query=react');
//     this.setState({ images: response.data.hits });
//   }

//   render() {
//     const { images } = this.state;
//     return (
//       <div>
//         <ImageGallery images={images} />
//       </div>
//     );
//   }
// }

// /////////////////////////////////
// export class App extends Component {
//   state = {
//     images: null,
//     loading: false,
//   };

//   componentDidMount() {
//     this.setState({ loading: true });

//     fetch(
//       'https://pixabay.com/api/?q=cat&page=1&key=28317427-cd386f88f666cbda8176ce58f&image_type=photo&orientation=horizontal&per_page=12'
//     )
//       .then(res => res.json())
//       .then(images => this.setState({ images }))
//       .finally(() => this.setState({ loading: false }));
//   }

//   formSubmitHendler = image => {
//     this.setState(prevState => ({
//       images: [...prevState.images, image],
//     }));
//   };

//   render() {
//     return (
//       <>
//         {/* <Searchbar onSubmit={this.formSubmitHendler}></Searchbar> */}
//         {this.state.loading && <h1>Loading...</h1>}
//         {this.state.images && <div>images</div>}
//         <Searchbar></Searchbar>
//       </>
//     );
//   }
// }

// //////////////////////////////////////////////////////////////////////////////////

export class App extends Component {
  state = {
    imageName: '',
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
    // console.log(imageName);
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery imageName={this.state.imageName} />
        <ToastContainer />
      </div>
    );
  }
}
