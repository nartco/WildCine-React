import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Spinner from 'react-bootstrap/Spinner'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import '../css/carousel.css'



//breakpoint du carousel pour les differents devices 

   const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const mapStateToProps = (state) => {
    return state
  }
  
  class CarouselM extends React.Component {
    _isMounted = false;

    state = { additionalTransfrom: 0,
      photos: [],
      isLoading: false,
    };

//Appel de l'API movieDB, placement du resultat dans le state Photos[]
    componentDidMount(){
      this._isMounted = true;
      this.setState({isLoading: true})
      fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`)
      .then(response => response.json())
      .then(data => (this.setState({photos: data.results.slice(0,10), isLoading: false})));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
   _choiceMovie(movie) {
    const action = { type: "CHOICEMOVIE", value: movie }
    return this.props.dispatch(action)
}
    render() {
//on creer un array (slides) via la fonction map qui parcourt photos[] et pour chaque elements du tableau creer une div contenant
// un lien (affiche details film sur une nouvelle page), une img via le lien avec la base (w400 = size img), + l'id de l'image (poster_path)
// une div qui affiche l'index + 1 dans le carousel (car premier index = 0 ) et le titre du film
      const slides = this.state.photos.map((item,index) => {
        return (
            <div className="image-container increase-size" key={index}>
            <Link to="/movie" onClick={() => this._choiceMovie(item.id)}>
            <img
              draggable={false}
              style={{ width: "70%", cursor: "pointer" }}
              src={'https://image.tmdb.org/t/p/w400/' + item.poster_path} alt={item.original_title}
            />
            <div className="image-container-text">
              <p>{index + 1}.{item.title} </p>
            </div>
            </Link>
          </div>
          
        );
      });
      return (
        <div>
          {this.state.isLoading === false ?  
          <Carousel
            ssr={false}
            ref={el => (this.Carousel = el)}
            partialVisbile={false}
            itemClass="slider-image-item"
            responsive={responsive}
            infinite={true}
            autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={1200}
            containerClass="carousel-container-with-scrollbar"
            additionalTransfrom={-this.state.additionalTransfrom}
            keyBoardControl={true}
            transitionDuration={1500}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={this.props.deviceType}
          >
            {slides}
          </Carousel>
          :
          <Spinner size="lg" animation="border" />
          }
          
        </div>
      );
    }
  }
  // doc react-multi-carousel -> https://www.npmjs.com/package/react-multi-carousel
  export default connect(mapStateToProps)(CarouselM);